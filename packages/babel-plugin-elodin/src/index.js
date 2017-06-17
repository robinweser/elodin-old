function toJSObject(props) {
  return props.reduce((obj, prop) => {
    obj[prop.key.name] = prop.value.value
    return obj
  }, {})
}

function format(obj) {
  const newObj = {}
  for (const key in obj) {
    newObj[key] = obj[key].replace('0.', '.')
  }
  return newObj
}

function toObjectProps(obj, t) {
  const props = []

  for (const key in obj) {
    props.push(t.objectProperty(t.identifier(key), t.stringLiteral(obj[key])))
  }
  return props
}

export default function elodinPlugin(babel) {
  const { types: t } = babel

  return {
    visitor: {
      VariableDeclaration(path) {
        if (
          path.node.leadingComments &&
          path.node.leadingComments.find(
            comment => comment.value.trim() === 'elodin'
          )
        ) {
          path.node.declarations.forEach(declaration => {
            const props = declaration.init.properties

            declaration.init.properties = toObjectProps(
              format(toJSObject(props)),
              t
            )
          })
        }
      }
    }
  }
}
