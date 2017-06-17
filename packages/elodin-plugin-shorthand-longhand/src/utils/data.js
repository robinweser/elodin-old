export const longhandMap = {
  animation: [
    'animationName',
    'animationDuration',
    'animationTimingFunction',
    'animationDelay',
    'animationIterationCount',
    'animationDirection',
    'animationFillMode',
    'animationPlayState'
  ],
  background: [
    'backgroundAttachment',
    'backgroundClip',
    'backgroundColor',
    'backgroundImage',
    'backgroundOrigin',
    'backgroundPosition',
    'backgroundRepeat',
    'backgroundSize'
  ],
  /* backgroundPosition: ['backgroundPositionX', 'backgroundPositionY'],
  backgroundRepeat: ['backgroundRepeatX', 'backgroundRepeatY'], */
  border: ['borderWidth', 'borderStyle', 'borderColor'],
  borderImage: [
    'borderImageOutset',
    'borderImageRepeat',
    'borderImageSlice',
    'borderImageSource',
    'borderImageWidth'
  ],
  /**
    borderBottom: ['borderBottomWidth', 'borderBottomStyle', 'borderBottomColor'],
    borderColor: [
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor'
  ],

  borderLeft: ['borderLeftWidth', 'borderLeftStyle', 'borderLeftColor'],
  borderRadius: [
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius'
  ],
  borderRight: ['borderRightWidth', 'borderRightStyle', 'borderRightColor'],
  borderStyle: [
    'borderTopStyle',
    'borderRightStyle',
    'borderBottomStyle',
    'borderLeftStyle'
  ],
  borderTop: ['borderTopWidth', 'borderTopStyle', 'borderTopColor'],
  borderWidth: [
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth'
  ],**/
  columnRule: ['columnRuleWidth', 'columnRuleStyle', 'columnRuleColor'],
  columns: ['columnWidth', 'columnCount'],
  margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
  outline: ['outlineWidth', 'outlineStyle', 'outlineColor'],
  padding: ['paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop'],
  perspectiveOrigin: ['perspectiveOriginX', 'perspectiveOriginY'],
  textDecoration: [
    'textDecorationColor',
    'textDecorationStyle',
    'textDecorationLine'
  ],
  transition: [
    'transitionProperty',
    'transitionDuration',
    'transitionTimingFunction',
    'transitionDelay'
  ]
}

export const shorthands = Object.keys(longhandMap)
