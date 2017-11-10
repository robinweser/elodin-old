export type Bredon = {
  generate: Function,
  compile: Function,
  parse: Function,
  traverse: Function,
}

export type PluginInterface = {
  fix: boolean,
  style: Object,
  addWarning: Function,
  bredon: Bredon,
}
