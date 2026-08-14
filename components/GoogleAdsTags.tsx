"use client";

import Script from "next/script";

export default function GoogleAdsTags() {
  return (
    <>
      {/* Google Tag Manager */}
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function (w, d, s, l, i) {
          w[l] = w[l] || []; w[l].push({
            'gtm.start': new Date().getTime(), event: 'gtm.js'
          }); var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
              'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-5L2M8GLK');`}
      </Script>

      {/* Google Ads + GA4 lien ket (AW-16744715384, G-JGWGCT1594) */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=AW-16744715384" strategy="afterInteractive" />
      <Script id="gads-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16744715384');
          gtag('config', 'G-JGWGCT1594');

          window.gtag_report_conversion = function(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
              'send_to': 'AW-16744715384/NhWjCNzV3N8ZEPiowLA-',
              'event_callback': callback
            });
            return false;
          };
        `}
      </Script>
    </>
  );
}
