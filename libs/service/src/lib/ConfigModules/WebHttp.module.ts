import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";

export class CustomConfig {
    apiEndpoint!: string
}

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [],
    exports:[]
})
export class ConfigModule{

    static ForRoot(config: CustomConfig): ModuleWithProviders<ConfigModule>{
        console.log(`Config.forRoot ${config.apiEndpoint}`);
        return {
            ngModule: ConfigModule,
            providers: [{provide: CustomConfig, useValue: config}]
        }
    }
}