interface ApiConfig {
    baseUrl: string;
    package: string;
    appEnv: string;
}

const AppConfig: ApiConfig = {
    baseUrl: process.env.NEXT_PUBLIC_BASE_API ?? "",
    package: process.env.NEXT_PUBLIC_PACKAGE ?? "",
    appEnv: process.env.NEXT_PUBLIC_ENV ?? ""
}

export {
    AppConfig,
    type ApiConfig,
}