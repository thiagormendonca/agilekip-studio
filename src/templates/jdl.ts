export default (
  name: string,
  packageName: string,
  languages: string[],
  database: string
) => `
    application {
        config {
            baseName ${name}
            packageName  ${packageName}
            languages [${languages.join(', ')}]
            applicationType monolith
            authenticationType jwt
            blueprints [generator-jhipster-agilekip]
            buildTool maven
            cacheProvider ehcache
            clientFramework vue
            clientPackageManager npm
            clientTheme none
            creationTimestamp 1641146021047
            databaseType sql
            devDatabaseType h2Disk
            dtoSuffix DTO
            enableHibernateCache true
            enableSwaggerCodegen false
            enableTranslation true
            jhiPrefix jhi
            jhipsterVersion "7.0.1"
            jwtSecretKey "MzcyNDBjOTMyNzViNjExMGRlMWQ4ZTZmMGMzMGM1MzNmZWNhNWIxYTQwYWM3NDAxOTI1NDdiNTFiYTkzZGE3YTc2ODA5NGIyZDk4ZGJjMWQ3NGVhOGRjMTViYjRiZTQ1ODlhYzQ5ZmE3MTgyNDVmYTFkNjNkZDA4ODdkYjk4ZWU="
            messageBroker false
            nativeLanguage en
            otherModules [generator-jhipster-agilekip]
            prodDatabaseType ${database}
            reactive false
            searchEngine false
            serverPort 8080
            serviceDiscoveryType false
            skipClient false
            skipServer false
            skipUserManagement false
            testFrameworks []
            websocket false
            withAdminUi true
        }
    }
`;
