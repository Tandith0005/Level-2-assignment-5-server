export const sendResponse = (res: any, options: any) => {
    const { statusCode, success, message, data, meta } = options;
    res.status(statusCode).json({
        success: success || false,
        message: message || null,
        data: data || null,
        meta: meta || null,
    });
};