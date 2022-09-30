class HttpException extends Error {
  // status: number;

  constructor(public status: number, message: string) {
    super(message);
    // this.status = status;
  }
}

export default HttpException;
