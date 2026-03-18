import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { RESPONSE_STATUS } from '../constants';
import { ErrorModel } from '../types/error.type';

@Injectable()
export class UtilsService {
  getIndexByProperty(targetArray: any[], key: any, value: any) {
    try {
      const index = targetArray.findIndex((item) => item[key] === value);
      return index;
    } catch (error) {
      console.log(error);
    }
  }

  groupByProperty(targetArray: any[], key: string) {
    return targetArray.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  static toNumber = (value: string) => {
    const newValue: number = Number.parseInt(value);
    return newValue;
  };

  static addInclusiveDays = (date: Date, interval: number) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + interval);
    return newDate;
  };

  static addExclusiveDays = (date: Date, interval: number) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + interval);
    newDate.setMilliseconds(-1);
    return newDate;
  };

  static subtractDays = (date: Date, interval: number) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() - interval);
    return newDate;
  };

  static resetTimeStamp = (date: Date) => {
    let value = date.toISOString().split('T')[0];
    let newDate = new Date(value);
    return newDate;
  };

  static removeTimeStamp = (date: Date) => {
    let value = date.toISOString().split('T')[0];
    return value;
  };

  getErrorModel(status: boolean, message: string, error: Error): ErrorModel {
    return new ErrorModel(status, message, error);
  }

  unique(data: any[], propertyName: string) {
    return data.filter(
      (e, i) => data.findIndex((a) => a[propertyName] === e[propertyName]) === i
    );
  }

  static getErrorModelStatic(
    status: boolean,
    message: string,
    error: Error
  ): ErrorModel {
    return new ErrorModel(status, message, error);
  }

  mappingFileHeader(data: any[], headerMap: any) {
    return data.map(function (item) {
      for (const [key, value] of Object.entries(headerMap)) {
        if (key in item) {
          item[String(value)] = item[key];
          delete item[key];
        }
      }
      return item;
    });
  }

  static groupBy<T, K extends keyof any>(list: T[], getKey: (item: T) => K) {
    return list.reduce((previous, currentItem) => {
      const group = getKey(currentItem);
      if (!previous[group]) previous[group] = [];
      previous[group].push(currentItem);
      return previous;
    }, {} as Record<K, T[]>);
  }

  getDifference<T>(a: T[], b: T[]): T[] {
    return a.filter((element) => {
      return !b.includes(element);
    });
  }

  isFileEmpty(file: Express.Multer.File): boolean {
    return file.size === 0
  }

  isEmptyString(value: string | undefined): boolean {
    return value !== undefined && value.trim() === '';
  }

  getLastSixDigitOfCurrentTimeStamp() {
    return Date.now().toString().slice(-6)
  }
}
