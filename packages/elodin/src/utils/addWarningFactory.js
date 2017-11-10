/* @flow */
type Warning = {
  type: string,
  description: string,
}

export default function addWarningFactory(warnings: Array<Warning>): Function {
  return (warning: Warning) => warnings.push(warning)
}
