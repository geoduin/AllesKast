import { Module, DynamicModule } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { Neo4jConfig } from './neo4j.config';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.constants';
import { createDriver } from './neo4j.utils';

@Module({})
export class Neo4jModule {
  static forRoot(config: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      global: true,
      providers: [
        {
          provide: NEO4J_CONFIG,
          useValue: config,
        },
        {
          provide: NEO4J_DRIVER,
          inject: [ NEO4J_CONFIG ],
          useFactory: async (config: Neo4jConfig) => createDriver(config),
        },
        Neo4jService,
      ],
      exports: [
        Neo4jService,
      ]
    }
  }

  static forMock() {
    console.log();
  }
}