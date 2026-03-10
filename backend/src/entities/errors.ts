import { GraphQLError } from "graphql"

export class UnauthenticatedError extends GraphQLError {
    constructor(params?: { message?: string}) {
        super(params?.message || "vous devez être authentifiés pour faire cette opération", {
            extensions: { code: "UNAUTHENTICATED", http: {status: 401} }
        })
    }
}
