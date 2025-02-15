import React from 'react';
import Close from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Block from './Block';
import ThemeContext from './theme/ThemeContext';

const useStyles = ({ inputStyle }) =>
  makeStyles({
    input: {
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      ...inputStyle,
    },
    iconButton: {
      padding: 10,
    },
    removeButton: {
      padding: 10,
      width: 48,
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    divider: {
      margin: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const SearchPopper = React.forwardRef(
  (
    {
      leftComponent,
      rightComponent,
      removeTextComponent,
      placeholder,
      elevation,
      onLeftButtonClick,
      onFocus,
      onLostFocus,
      onRightButtonClick,
      showRemove,
      onRemoveText,
      input,
      readOnly,
      startAdornment,
      endAdornment,
      disableUnderline,
      paper,
      label,
      style,
      inputStyle,
      inputProps,
      divider,
      error,
      ...props
    },
    ref
  ) => {
    const { colors, sizes } = React.useContext(ThemeContext);
    const classes = useStyles({ sizes, style, inputStyle, colors })();
    const val = props.value || input.value;

    // const RightComponent = React.useCallback(() => {
    //   if (!rightComponent) return null;
    //   if (typeof rightComponent === 'function') {
    //     return rightComponent();
    //   }
    //   return React.cloneElement(rightComponent, {
    //     onClick: onRightButtonClick,
    //     className: classes.iconButton,
    //     ...rightComponent.props,
    //   });
    // }, []);

    const RightComponent = () => {
      if (!rightComponent) return null;
      if (typeof rightComponent === 'function') {
        return rightComponent();
      }
      return React.cloneElement(rightComponent, {
        onClick: onRightButtonClick,
        className: classes.iconButton,
        ...rightComponent.props,
      });
    };

    // const RemoveTextComponent = React.useCallback(() => {
    //   if (!removeTextComponent) return null;

    //   if (typeof removeTextComponent === 'function') {
    //     return removeTextComponent();
    //   }

    //   return React.cloneElement(removeTextComponent, {
    //     ...removeTextComponent.props,
    //     className: classes.removeButton,
    //     onClick: onRemoveText,
    //   });
    // }, []);

    const RemoveTextComponent = () => {
      if (!removeTextComponent) return null;

      if (!val) {
        return <Block className={classes.removeButton} />;
      }

      if (typeof removeTextComponent === 'function') {
        return removeTextComponent();
      }

      return React.cloneElement(removeTextComponent, {
        ...removeTextComponent.props,
        className: classes.removeButton,
        onClick: onRemoveText,
      });
    };

    // const LeftComponent = React.useCallback(() => {
    //   if (!leftComponent) return null;
    //   if (typeof leftComponent === 'function') {
    //     return leftComponent();
    //   }

    //   return React.cloneElement(leftComponent, {
    //     ...leftComponent.props,
    //     className: classes.iconButton,
    //     onClick: onLeftButtonClick,
    //   });
    // }, []);

    const LeftComponent = () => {
      if (!leftComponent) return null;

      if (typeof leftComponent === 'function') {
        return leftComponent();
      }

      return React.cloneElement(leftComponent, {
        ...leftComponent.props,
        className: classes.iconButton,
        onClick: onLeftButtonClick,
      });
    };

    return (
      <Block
        row
        middle
        paper={paper}
        elevation={elevation}
        style={{
          padding: 5,
          backgroundColor: colors.white,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: error ? colors.error : colors.gray,
          height: sizes.inputHeight,
          ...style,
        }}
      >
        <LeftComponent />
        <TextField
          inputRef={ref}
          InputProps={{
            classes: {
              root: classes.input,
            },
            startAdornment,
            endAdornment,
            disableUnderline,
            ...inputProps,
          }}
          label={placeholder || label || ''}
          onFocus={onFocus}
          onBlur={onLostFocus}
          style={{ width: '100%', height: 'auto', minWidth: 40 }}
          multiline
          {...input}
          {...props}
        />
        {showRemove && <RemoveTextComponent />}

        {rightComponent && divider && (
          <Divider
            className={classes.divider}
            flexItem
            orientation="vertical"
          />
        )}

        <RightComponent />
      </Block>
    );
  }
);

SearchPopper.defaultProps = {
  onFocus: () => {},
  onLostFocus: () => {},
  onSubmit: () => {},
  elevation: 1,
  input: {
    onChange: () => null,
  },
  paper: false,
  disableUnderline: true,
  showRemove: false,
  removeTextComponent: (
    <IconButton>
      <Close />
    </IconButton>
  ),
  divider: true,
};

export default SearchPopper;
