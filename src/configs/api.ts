interface ApiConfig {
    baseUrl: string;
    package: string;
}

const AppConfig: ApiConfig = {
    baseUrl: process.env.NEXT_PUBLIC_BASE_API ?? "",
    package: process.env.NEXT_PUBLIC_PACKAGE ?? ""
}

export {
    AppConfig,
    type ApiConfig,
}