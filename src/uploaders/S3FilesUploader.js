/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable operator-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
import React from 'react';
import qs from 'qs';
import uniq from 'uid';
import Block from '../Block';
import IconButton from '../IconButton';
import Text from '../Text';
import toastr from '../toastr';
import Dialog from '../dialogs/Dialog';
import Button from '../Button';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import isEqual from 'lodash/isEqual';
import isPlainObject from 'lodash/isPlainObject';
import isEmpty from 'lodash/isEmpty';
import Upload from '@mui/icons-material/Upload';
import Close from '@mui/icons-material/Close';
import { DialogHeader, DialogContent, DialogActions } from '../dialogs';
import ThemeContext from '../theme/ThemeContext';
import FileIcon from './FileIcon';

const S3FilesUploader = ({
  dirname,
  ACL,
  signaxiosinstance,
  uploadaxiosinstance = axios,
  input,
  value,
  onChange,
  limit,
  maxSize,
  accept,
  onUploadProgress = () => null,
  setuploading = () => null,
  disabled,
  readOnly,
  signurl = '/media/upload/signput',
  deleteurl = '/media/upload/deletefiles',
}) => {
  const incominginput = input.value || value;
  const { colors } = React.useContext(ThemeContext);
  const [fileList, setfileList] = React.useState(
    Array.isArray(incominginput) ? incominginput : []
  );
  const [confirmdelete, setconfirmdelete] = React.useState(false);
  const [deleting, setdeleting] = React.useState(null);

  const elemId = uniq(5);

  React.useEffect(() => {
    if (Array.isArray(incominginput) && !isEqual(incominginput, fileList)) {
      setfileList(incominginput);
    }
    if (
      (!limit || limit === 1) &&
      isPlainObject(incominginput) &&
      !isEmpty(incominginput)
    ) {
      setfileList([incominginput]);
    }
  }, [incominginput]);

  const logChange = (fileUpdate) => {
    if (typeof input.onChange === 'function') {
      if (limit === 1) {
        input.onChange((fileUpdate || [])[0]);
      } else {
        input.onChange(fileUpdate || []);
      }
    }
    if (typeof onChange === 'function') {
      if (limit === 1) {
        onChange((fileUpdate || [])[0]);
      } else {
        onChange(fileUpdate || []);
      }
    }
  };

  React.useEffect(() => {
    if (Array.isArray(fileList)) {
      const uploading = fileList.filter(Boolean).map(({ status }) => {
        if (status === 'done') return 'done';
        return 'uploading';
      });
      if (uploading.indexOf('uploading') !== -1) {
        setuploading(true);
        onUploadProgress({
          uploading: true,
          finished: false,
        });
        logChange(fileList);
      } else {
        setuploading(false);
        onUploadProgress({
          uploading: false,
          finished: false,
        });
        logChange(fileList);
      }
    }
  }, [fileList]);

  React.useEffect(() => {
    if (deleting && confirmdelete) {
      signaxiosinstance()
        .post(deleteurl, { files: [deleting] })
        .then(({ data }) => {
          toastr.success(data.message);
          setfileList((files) => {
            if (files.length > 0) {
              const progressArray = files
                .filter(Boolean)
                .map((obj) => {
                  if ((obj || {}).fd === deleting) {
                    return null;
                  }
                  return obj;
                })
                .filter(Boolean);
              return progressArray;
            }
          });
          setdeleting(null);
          setconfirmdelete(false);
        })
        .catch((error) => {
          const response = error.response || {};
          const data = response.data || {};
          toastr.error(data.message || data);
        });
    }
  }, [confirmdelete, deleting]);

  const onprogress = (progressEvent, url) => {
    if (progressEvent && url) {
      setfileList((urls) => {
        if (urls.length > 0) {
          const progressArray = urls.map((obj) => {
            if (obj && obj.signedUrl === url) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              return { ...obj, progress };
            }
            return obj;
          });
          return progressArray;
        }
        return urls;
      });
    }
  };

  const onUploadFinish = (url) => {
    if (url) {
      setfileList((urls) => {
        if (urls.length > 0) {
          const progressArray = urls.map((obj) => {
            if (obj && url === obj.signedUrl) {
              const newobj = { ...obj, status: 'done' };
              delete newobj.signedUrl;
              delete newobj.progress;
              return { ...newobj };
            }
            return obj;
          });
          return progressArray;
        }
        return urls;
      });

      onUploadProgress({
        uploading: false,
        finished: true,
      });
    }
  };

  const onUploadError = (url) => {
    if (url) {
      setfileList((urls) => {
        if (urls.length > 0) {
          const progressArray = urls.map((obj) => {
            if (obj && url === obj.signedUrl) {
              toastr.error(
                `File ${
                  obj.filename || obj.name
                } upload failed. please try again later`
              );
              return null;
            }
            return obj;
          });
          return progressArray;
        }
        return urls;
      });
    }
  };

  const handleFiles = async (event) => {
    const { files } = event.target;
    if (
      limit &&
      Array.isArray(fileList) &&
      Array.isArray(files) &&
      files.length + fileList.length > limit
    ) {
      return toastr.error(`Only a maximum of ${limit} files allowed`);
    }
    if (maxSize && maxSize > 0) {
      const sizelimit = Number(maxSize * 1024 * 1024);
      const inds = [...(files || [])]
        .map((file, index) =>
          file && file.size > sizelimit ? index + 1 : null
        )
        .filter(Boolean);
      if (inds.length > 0) {
        return toastr.error(
          `File "${
            files[inds[0] - 1].name
          }" exceeds ${maxSize}MB. Please try again with a smaller file`
        );
      }
    }

    const fileArray = [...(files || [])].filter(Boolean).map((file) => ({
      name: ((file || {})[0] || file).name.replace(/[^\w\d_\-.]+/gi, ''),
      type: ((file || {})[0] || file).type,
      size: ((file || {})[0] || file).size,
    }));

    if (fileArray.length > 0) {
      const signedUrls = await getSignedUrl(fileArray).then((urls) => urls);
      if (!signedUrls) {
        return;
      }
      signedUrls.filter(Boolean);
      const uploads = [...(files || [])].filter(Boolean).map((fileItem) => {
        const file = fileItem[0] || fileItem;
        return signedUrls
          .filter(Boolean)
          .map(({ signedUrl, filename }) => {
            if (filename === file.name.replace(/[^\w\d_\-.]+/gi, '')) {
              return {
                signedUrl,
                file,
                options: {
                  headers: {
                    'Content-Type': qs.parse(signedUrl)['Content-Type'],
                    Expires: qs.parse(signedUrl).Expires,
                    'x-amz-acl':
                      qs.parse(signedUrl)['x-amz-acl'] || 'public-read',
                  },
                  onUploadProgress: (progressEvent) => {
                    onprogress(progressEvent, signedUrl);
                  },
                },
              };
            }
            return null;
          })
          .filter(Boolean)[0];
      });

      for (const thisfile of uploads) {
        try {
          await uploadaxiosinstance.put(
            thisfile.signedUrl,
            thisfile.file,
            thisfile.options
          );
          onUploadFinish(thisfile.signedUrl);
        } catch (error) {
          onUploadError(thisfile.signedUrl);
          toastr.error(
            `${
              error.response
                ? error.response.data
                : `upload failed, try again later${thisfile.signedUrl}`
            }`
          );
          continue;
        }
      }
    }
  };

  const onDelete = (fd) => {
    setdeleting(fd);
  };

  const getSignedUrl = async (files) => {
    const urls = await signaxiosinstance()
      .post(signurl, {
        files,
        ACL: ACL || 'public-read',
        dirname: dirname || 'files/',
      })
      .then(({ data }) => {
        if (data && Array.isArray(data.signedUrls)) {
          const signedUrls = data.signedUrls.map((obj) => ({
            ...obj,
            progress: 0,
          }));
          setfileList((files) => [...files, ...signedUrls]);
          return signedUrls;
        }
      })
      .catch(() => {
        toastr.error(
          'There was an error uploading file. Please try again later'
        );
      });
    return urls;
  };
  return (
    <Block paper padding={20} elevation={5}>
      {fileList.length < limit && (
        <React.Fragment>
          <input
            type="file"
            id={`fileElem${elemId}`}
            multiple={limit && limit > 1}
            accept={accept}
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              overflow: 'hidden',
              clip: 'rect(1px, 1px, 1px, 1px)',
            }}
            onChange={handleFiles}
            disabled={disabled || readOnly}
          />
          <label htmlFor={`fileElem${elemId}`} style={{ cursor: 'pointer' }}>
            <Block middle center>
              <Upload color="info" />
              <Text caption>
                {fileList.length > 0 ? 'Upload more' : 'Upload'}
              </Text>
            </Block>
          </label>
        </React.Fragment>
      )}
      <List>
        {Array.isArray(fileList) &&
          fileList.filter(Boolean).map(({ fd, filename, progress, status }) => (
            <ListItem key={fd} dense divider>
              <ListItemIcon>
                <FileIcon fd={fd} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Text
                    subHeader
                    style={{
                      marginRight: progress < 100 ? 75 : 25,
                      overflow: 'hidden',
                    }}
                  >
                    {filename}
                  </Text>
                }
              />
              <ListItemSecondaryAction>
                {progress < 100 && (
                  <Text small>
                    ...uploading <Text subHeader>{`${progress}%`}</Text>
                  </Text>
                )}
                {status === 'done' && (
                  <IconButton
                    onClick={() => {
                      if (!disabled && !readOnly) {
                        onDelete(fd);
                      }
                    }}
                  >
                    <Close />
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
      <Dialog
        maxWidth="sm"
        open={deleting !== null}
        onClose={() => setdeleting(null)}
        // onConfirm={() => setconfirmdelete(true)}
        minHeight={200}
      >
        <DialogHeader onClose={() => setdeleting(null)} />
        <DialogContent>
          <Text>Sure you want to remove File?</Text>
        </DialogContent>
        <DialogActions>
          <Button
            contained
            color={colors.error}
            onClick={() => {
              setdeleting(null);
            }}
          >
            Cancel
          </Button>
          <Button
            contained
            color={colors.success}
            onClick={() => {
              setconfirmdelete(true);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Block>
  );
};

S3FilesUploader.defaultProps = {
  onChange: () => {},
  input: {
    value: null,
    onChange: () => {},
  },
  setuploading: () => {},
  limit: 1,
};
export default S3FilesUploader;
