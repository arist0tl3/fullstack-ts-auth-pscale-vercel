/* eslint-disable no-unused-vars */
import { OkPacket, RowDataPacket } from 'mysql2/promise';

export type DbDefaults = RowDataPacket[] | RowDataPacket[][] | OkPacket[] | OkPacket

export type DbQuery<T> = T & DbDefaults

export type DbExec = <T>(query: string, params?: Array<any>) => Promise<[T, any]>

export interface DB {
  execute: DbExec
}
