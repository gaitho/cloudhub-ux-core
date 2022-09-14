// just copy this code from the driving repo :)
import React from 'react';
import Typography from '@mui/material/Typography';
import ThemeContext from './theme/ThemeContext';

const Text = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  title,
  subTitle,
  header,
  subHeader,
  body,
  caption,
  small,
  size,
  transform,
  button,
  // styling
  regular,
  bold,
  normal,
  semibold,
  medium,
  weight,
  light,
  thin,
  italic,
  underline,
  strikethrough,
  center,
  right,
  spacing, // letter-spacing
  height, // line-height
  noWrap,
  fullWidth,
  link,
  // colors
  color,
  accent,
  primary,
  secondary,
  tertiary,
  black,
  white,
  gray,
  gray2,
  darkGray,
  gray3,
  gray4,
  dark,
  mistyWhite,
  milkyWhite,
  error,
  clear,
  facebook,
  transparent,
  silver,
  steel,
  ricePaper,
  frost,
  cloud,
  windowTint,
  panther,
  charcoal,
  coal,
  bloodOrange,
  snow,
  ember,
  fire,
  drawer,
  eggplant,
  twitterColor,
  facebookColor,
  googleColor,
  linkedinColor,
  pinterestColor,
  youtubeColor,
  tumblrColor,
  behanceColor,
  dribbbleColor,
  redditColor,
  instagramColor,
  success,
  info,
  rose,
  warning,
  danger,
  style,
  children,
  classes,
  cropped,
  middle,
  ...props
}) => {
  const { fonts, colors } = React.useContext(ThemeContext) || {
    fonts: {},
    colors: {},
  };
  const [hovered, sethovered] = React.useState(false);

  const styles = {
    // default style
    text: {
      color: 'inherit',
    },
    // variations
    regular: {
      fontWeight: 'normal',
    },
    bold: fonts.bold,

    semibold: {
      ...fonts.semibold,
    },
    medium: {
      fontWeight: '500',
    },
    light: fonts.light,
    normal: fonts.normal,
    thin: {
      fontWeight: 100,
    },
    italic: fonts.italic,
    underline: fonts.underline,
    strikethrough: fonts.strikethrough,
    // position
    center: { textAlign: 'center' },
    right: { textAlign: 'right' },
    middle: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
    // colors
    accent: { color: colors.accent },
    primary: { color: colors.primary },
    secondary: { color: colors.secondary },
    tertiary: { color: colors.tertiary },
    black: { color: colors.black },
    white: { color: colors.white },
    gray: { color: colors.gray },
    gray2: { color: colors.gray2 },
    dark: { color: colors.dark },
    darkGray: { color: colors.darkGray },
    gray3: { color: colors.gray3 },
    gray4: { color: colors.gray4 },
    mistyWhite: { color: colors.mistyWhite },
    milkyWhite: { color: colors.milkyWhite },
    error: { color: colors.error },
    clear: { color: colors.clear },
    facebook: { color: colors.facebook },
    transparent: { color: colors.transparent },
    silver: { color: colors.silver },
    steel: { color: colors.steel },
    ricePaper: { color: colors.ricePaper },
    frost: { color: colors.frost },
    cloud: { color: colors.cloud },
    windowTint: { color: colors.windowTint },
    panther: { color: colors.panther },
    charcoal: { color: colors.charcoal },
    coal: { color: colors.coal },
    bloodOrange: { color: colors.bloodOrange },
    snow: { color: colors.snow },
    ember: { color: colors.ember },
    fire: { color: colors.fire },
    drawer: { color: colors.drawer },
    eggplant: { color: colors.eggplant },
    twitterColor: { color: colors.twitterColor },
    facebookColor: { color: colors.facebookColor },
    googleColor: { color: colors.googleColor },
    linkedinColor: { color: colors.linkedinColor },
    pinterestColor: { color: colors.pinterestColor },
    youtubeColor: { color: colors.youtubeColor },
    tumblrColor: { color: colors.tumblrColor },
    behanceColor: { color: colors.behanceColor },
    dribbbleColor: { color: colors.dribbbleColor },
    redditColor: { color: colors.redditColor },
    instagramColor: { color: colors.instagramColor },
    success: { color: colors.success },
    info: { color: colors.info },
    rose: { color: colors.rose },
    warning: { color: colors.warning },
    danger: { color: colors.danger },
    // fonts
    h1: fonts.h1,
    h2: fonts.h2,
    h3: fonts.h3,
    h4: fonts.h4,
    h5: fonts.h5,
    h6: fonts.h6,
    title: fonts.title,
    subTitle: fonts.subTitle,

    header: fonts.header,
    subHeader: fonts.subHeader,

    body: fonts.body,
    caption: fonts.caption,
    small: fonts.small,
    button: fonts.button,
  };

  const textStyles = {
    ...styles.text,
    ...(h1 && styles.h1),
    ...(h2 && styles.h2),
    ...(h3 && styles.h3),
    ...(h4 && styles.h4),
    ...(h5 && styles.h5),
    ...(h6 && styles.h6),
    ...(title && styles.title),
    ...(subTitle && styles.subTitle),
    ...(header && styles.header),
    ...(subHeader && styles.subHeader),
    ...(body && styles.body),
    ...(caption && styles.caption),
    ...(small && styles.small),
    ...(size && { fontSize: size }),
    ...(button && styles.button),
    ...(transform && { textTransform: transform }),
    ...(height && { lineHeight: height }),
    ...(noWrap && {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),
    ...(fullWidth && { minWidth: '100%' }),
    ...(spacing && { letterSpacing: spacing }),
    ...(weight && { fontWeight: weight }),
    ...(regular && styles.regular),
    ...(bold && styles.bold),
    ...(semibold && styles.semibold),
    ...(medium && styles.medium),
    ...(light && styles.light),
    ...(thin && styles.thin),
    ...(italic && styles.italic),
    ...(underline && styles.underline),
    ...(strikethrough && styles.strikethrough),
    ...(normal && styles.normal),
    ...(center && styles.center),
    ...(middle && styles.middle),
    ...(right && styles.right),
    ...(color && styles[color]),
    ...(color && !styles[color] && { color }),
    ...(link && hovered && { ...styles.underline, cursor: 'pointer' }),
    // color shortcuts
    ...(accent && styles.accent),
    ...(primary && styles.primary),
    ...(secondary && styles.secondary),
    ...(tertiary && styles.tertiary),
    ...(black && styles.black),
    ...(white && styles.white),
    ...(gray && styles.gray),
    ...(gray2 && styles.gray2),
    ...(dark && styles.dark),
    ...(darkGray && styles.darkGray),
    ...(gray3 && styles.gray3),
    ...(gray4 && styles.gray4),
    ...(error && styles.error),
    ...(mistyWhite && styles.mistyWhite),
    ...(milkyWhite && styles.milkyWhite),
    ...(clear && styles.clear),
    ...(facebook && styles.facebook),
    ...(transparent && styles.transparent),
    ...(silver && styles.silver),
    ...(steel && styles.steel),
    ...(error && styles.error),
    ...(ricePaper && styles.ricePaper),
    ...(frost && styles.frost),
    ...(cloud && styles.cloud),
    ...(windowTint && styles.windowTint),
    ...(panther && styles.panther),
    ...(charcoal && styles.charcoal),
    ...(coal && styles.coal),
    ...(bloodOrange && styles.bloodOrange),
    ...(snow && styles.snow),
    ...(ember && styles.ember),
    ...(fire && styles.fire),
    ...(drawer && styles.drawer),
    ...(eggplant && styles.eggplant),
    ...(twitterColor && styles.twitterColor),
    ...(facebookColor && styles.facebookColor),
    ...(googleColor && styles.googleColor),
    ...(linkedinColor && styles.linkedinColor),
    ...(pinterestColor && styles.pinterestColor),
    ...(youtubeColor && styles.youtubeColor),
    ...(tumblrColor && styles.tumblrColor),
    ...(behanceColor && styles.behanceColor),
    ...(dribbbleColor && styles.dribbbleColor),
    ...(redditColor && styles.redditColor),
    ...(instagramColor && styles.instagramColor),
    ...(success && styles.success),
    ...(info && styles.info),
    ...(rose && styles.rose),
    ...(warning && styles.warning),
    ...(danger && styles.danger),
    ...style, // rewrite predefined styles
  };

  if (error) {
    return (
      <Typography
        component="span"
        onMouseEnter={() => sethovered(true)}
        onMouseLeave={() => sethovered(false)}
        style={{
          ...textStyles,
          lineHeight: '100%',
          margin: 0,
          padding: 0,
        }}
        {...props}
      >
        {children}
      </Typography>
    );
  }

  if (cropped) {
    return (
      <span
        onMouseEnter={() => sethovered(true)}
        onMouseLeave={() => sethovered(false)}
        style={{
          ...textStyles,
          display: 'inline-block',
          lineHeight: '0.75em',
        }}
      >
        <Typography
          component="span"
          style={{
            position: 'relative',
            bottom: '-0.13em',
          }}
        >
          {children}
        </Typography>
      </span>
    );
  }

  return (
    <Typography
      component="span"
      onMouseEnter={() => sethovered(true)}
      onMouseLeave={() => sethovered(false)}
      style={textStyles}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default Text;
