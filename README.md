## Sentry Init

- Invoke `initializeSentry` from `app.config.ts`

  ```typescript
  async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
    });
    initializeSentry(app)

    ...
  }
  ```

- You need to set `SENTRY_DSN` from `.env` file.
- Sentry capture already supported by template exception filter
- This template will set error code as Sentry Error name. If `Unknown` given, It'll set error with this format: `Unknown: (error message)`
  ![img](https://github.com/J-Hoplin/NestJS-Prisma-Boilerplate/assets/45956041/a1c67ecc-aaed-48b0-a848-a79e86ec9d82)

## TODO Left

### Start

```bash
yarn install

yarn prepare

yarn start
```

### Supported Repository Pattern

- Prisma

### Application

- [x] Nest.js Terminus integration
- [ ] Common library(Nest.js library)
  - [ ] S3
  - [ ] SQS
  - [ ] Localstack
- [x] Global Exception Filter
  - [x] Error code definition
- [x] Global Response Interceptor

### Test code

- [ ] Test code boilerplate
  - [ ] E2E test code boilerplate
  - [ ] Unit test code boilerplate
  - [ ] K6 stress test code boilerplate
- [ ] Utilities for test code
  - [ ] `testing-container` utility
  - [ ] Mocking utility

### CI/CD

- [x] Github Actions base script
- [ ] Elastic Beanstalk boiler command and directories(Follos EB standard)
