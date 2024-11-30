import { env as _env }               from './process/core/env'
import { corePromptLine as _prompt } from './process/prompts/line/main'
import { style as _style }           from './styles/main'
import * as _sys                     from './sys/main'

/** System functions */
export const sys = _sys
/** Prompt functions */
export const prompt = _prompt
/** Environment functions */
export const env = _env
/** Style functions */
export const style = _style
