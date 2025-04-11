export class ErrorHttp extends Error {
    constructor(message: string, public status: number) {
        super(message);
        this.name = 'ErrorHttp';
    }
}

export class ErrorNotFound extends ErrorHttp {
    constructor(message: string) {
        super(message, 404);
        this.name = 'ErrorNotFound';
    }
}

export class ErrorUnauthorized extends ErrorHttp {
    constructor(message: string) {
        super(message, 401);
        this.name = 'ErrorUnauthorized';
    }
}
