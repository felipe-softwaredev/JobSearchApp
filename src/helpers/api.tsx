export default class JoblyAPI {
  static baseURL = `https://${NEXT_PUBLIC_VERCEL_URL}/api`;

  static async findAll(endpoint: string) {
    const response = await fetch(`${this.baseURL}/${endpoint}`, {
      cache: 'no-store',
    });
    return response;
  }

  static async findOne(endpoint: string, param: string) {
    const response = await fetch(`${this.baseURL}/${endpoint}/${param}`, {
      cache: 'no-store',
    });
    return response;
  }

  static async createNew(endpoint: string, reqBody: {}) {
    const response = await fetch(`${this.baseURL}/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      cache: 'no-store',
    });
    return response;
  }

  static async update(endpoint: string, reqBody: {}) {
    const response = await fetch(`${this.baseURL}/${endpoint}/`, {
      method: 'PATCH',
      body: JSON.stringify(reqBody),
      cache: 'no-store',
    });
    return response;
  }
  static async delete(endpoint: string, param: string) {
    const response = await fetch(`${this.baseURL}/${endpoint}/${param}`, {
      method: 'DELETE',
      cache: 'no-store',
    });
    return response;
  }
  static async register(reqBody: {}) {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      cache: 'no-store',
    });
    return response;
  }
  static async login(reqBody: {} | any) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      cache: 'no-store',
    });
    return response;
  }
  static async ensureLogin() {
    const response = await fetch(`${this.baseURL}/auth/ensureLogin`, {
      cache: 'no-store',
    });
    return response;
  }
  static async logOut() {
    const response = await fetch(`${this.baseURL}/auth/logOut`, {
      cache: 'no-store',
    });
    return response;
  }
}
