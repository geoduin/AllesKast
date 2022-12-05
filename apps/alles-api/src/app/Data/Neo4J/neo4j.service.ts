import neo4j, { Result, Driver, SessionMode, ManagedTransaction } from 'neo4j-driver'
import { Injectable, Inject, OnApplicationShutdown } from '@nestjs/common';
import { Neo4jConfig } from './neo4j.config';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.constants';

export type TransactionWork = (tx: ManagedTransaction) => Promise<Result>;

@Injectable()
export class Neo4jService implements OnApplicationShutdown {
  constructor(
    @Inject(NEO4J_CONFIG) private readonly config: Neo4jConfig,
    @Inject(NEO4J_DRIVER) private readonly driver: Driver
  ) {}

  private getSession(mode: SessionMode) {
      return this.driver.session({
        database: this.config.database,
        defaultAccessMode: mode,
      });
  }

  private async executeSingle(mode: SessionMode, query: string, params?: unknown): Promise<Result> {
    const session = this.getSession(mode);
    const result = await session.run(query, params);
    session.close();
    return result;
  }


  private async executeTransaction(mode: SessionMode, transactionWork: TransactionWork): Promise<Result> {
    const session = this.getSession(neo4j.session.READ);

    let result;
    if (mode === neo4j.session.READ) {
      result = await session.executeRead(transactionWork);
    } else {
      result = await session.executeWrite(transactionWork);
    }

    session.close();
    return result;
  }

  getConfig(): Neo4jConfig {
      return this.config;
  }

  // use these two for access to neo4j result object when running one query
  async singleRead(query: string, params?: unknown): Promise<Result> {
    return this.executeSingle(neo4j.session.READ, query, params);
  }

  async singleWrite(query: string, params?: unknown): Promise<Result> {
    return this.executeSingle(neo4j.session.WRITE, query, params);
  }

  // use these two for access to neo4j result object when running transactions
  async readTransaction(transactionWork: TransactionWork): Promise<Result> {
    return this.executeTransaction(neo4j.session.READ, transactionWork);
  }

  async writeTransaction(transactionWork: TransactionWork): Promise<Result> {
    return this.executeTransaction(neo4j.session.READ, transactionWork);
  }

  // here the neo4j driver is abstracted away from the outside
  // TODO handle 64 bit integers
  // TODO clean returned object to match our own Node and Relation type?
  // TODO how to handle variadic types?
  // async run<R>(query: Neo4jQuery<R>, params?: unknown): Promise<R[]> {
  //   const result = await this.executeSingle(getMode(query.mode), query.text, params);
  //   return result.records.map(r => r.toObject());
  // }

  // transaction with neo4j driver abstracted away
  // TODO

  onApplicationShutdown() {
    return this.driver.close()
  }
}