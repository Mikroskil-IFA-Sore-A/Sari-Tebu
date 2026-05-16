import ClientError from "../exceptions/client_error.js";

const BODY_PARSER_MESSAGES = {
    "entity.parse.failed":  "Invalid JSON body",
    "entity.too.large":     "Request body too large",
    "charset.unsupported":  "Unsupported charset",
    "encoding.unsupported": "Unsupported encoding",
}

export default function (err, req, res, _next) {
    if (err instanceof ClientError) {
        res.status(err.statusCode).json({
            status: "fail",
            message: err.message,
        });
        return;
    }

    if (err.isJoi) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
        return;
    }

    const bodyParserMessage = BODY_PARSER_MESSAGES[err.type];
    if (bodyParserMessage) {
        res.status(err.statusCode).json({
            status: "fail", 
            message: bodyParserMessage
        });
        return;
    }

    // TODO: add better error logging
    console.error(err.stack);

    res.status(err.statusCode || 500).json({
        status: "error",
        message: "Internal Server Error",
    });
}
