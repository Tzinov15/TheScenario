import { Injectable } from '@nestjs/common';
import { DataDao } from './data.dao';
import { Data } from './data.db';

@Injectable()
export class AppService {
  constructor(private readonly dataDao: DataDao) {}

  async getAll() {
    return await this.dataDao.getAll();
  }

  async postData(data: Data) {
    return await this.dataDao.create(data);
  }

  async putData(data: Data) {
    return await this.dataDao.update(data);
  }

  async deleteData(id: string) {
    return await this.dataDao.delete(id);
  }
}
