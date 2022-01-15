import { HttpClient, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core'

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useValue: {
          handle({ interpolateParams, key }: MissingTranslationHandlerParams) {
            const defaultMessage = (interpolateParams as Record<string, string | undefined>)
              ?.default

            return defaultMessage ?? key
          },
        },
      },
    }),
  ],
  exports: [TranslateModule],
})
export class I18NModule {}
