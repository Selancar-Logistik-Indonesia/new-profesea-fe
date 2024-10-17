import Script from 'next/script'
import { useRouter } from 'next/router'

const Hotjar = () => {
  const router = useRouter()
  const isAdminPage = router.pathname.startsWith('/admin')

  if (process.env.NEXT_PUBLIC_ENV === 'PROD' && process.env.NEXT_PUBLIC_HOTJAR_ID && !isAdminPage) {
    return (
      <Script id='hotjar' strategy='afterInteractive'>
        {`
          (function (h, o, t, j, a, r) {
            h.hj =
              h.hj ||
              function () {
                // eslint-disable-next-line prefer-rest-params
                (h.hj.q = h.hj.q || []).push(arguments);
              };
            h._hjSettings = { hjid: ${process.env.NEXT_PUBLIC_HOTJAR_ID}, hjsv: 6 };
            a = o.getElementsByTagName("head")[0];
            r = o.createElement("script");
            r.async = 1;
            r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
            a.appendChild(r);
          })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
        `}
      </Script>
    )
  }

  return null
}

export default Hotjar
