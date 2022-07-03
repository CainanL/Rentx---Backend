import { Connection, createConnection, getConnectionOptions } from "typeorm";

// export default createConnection();

export default async(host = 'database'): Promise<Connection> => {
    
    const defaultOpitions = await getConnectionOptions();

    return createConnection(
        Object.assign(
            defaultOpitions,
            {
                host,
            }
        )
    )
}