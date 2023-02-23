import yargs from  'yargs'

export const { mode , PERSISTANCE , NODE_ENV , PORT , SESSIONTIME } = yargs(process.argv.slice(2))
    .alias({
        m: 'mode',
        persistance: 'PERSISTANCE',
        ST: 'SESSIONTIME'

    })
    .argv