/* eslint-disable max-len */
const scriptlets = require('scriptlets');
const validator = require('../main/validator.js');

// Mock log to hide error messages
jest.mock('../main/utils/log');

describe('validator', () => {
    it('Test css validation', () => {
        let rules = ['example.com##.div'];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        rules = ['example.com###div-id'];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        rules = ['example.com##a[href^=/], .container:has(nav) > a[href]:lt($var)'];
        expect(validator.validate(rules)).toHaveLength(0);

        rules = ['example.com##%'];
        expect(validator.validate(rules)).toHaveLength(0);
    });

    it('Test incorrect rules', () => {
        const rules = ['||example.com##.div', 'test$domain=yandex.ru,google.com'];
        expect(validator.validate(rules)).toHaveLength(0);
    });

    it('Test ext-css validation', () => {
        let selector = '#main > table.w3-table-all.notranslate:first-child > tbody > tr:nth-child(17) > td.notranslate:nth-child(2)';
        let ruleText = `w3schools.com##${selector}`;
        let rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        selector = "#body div[attr='test']:first-child  div";
        ruleText = `w3schools.com##${selector}`;
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        selector = '.todaystripe:matches-css(display: block)';
        ruleText = `w3schools.com##${selector}`;
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        selector = '.todaystripe:matches-css-before(display: block)';
        ruleText = `w3schools.com##${selector}`;
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        selector = '.todaystripe:matches-css-after(display: block)';
        ruleText = `w3schools.com##${selector}`;
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        selector = '.todaystripe:has(.banner)';
        ruleText = `w3schools.com##${selector}`;
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        selector = '.todaystripe:contains(test)';
        ruleText = `w3schools.com##${selector}`;
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        // TODO: Failed with ExtendedCss validation
        // ruleText = "drive2.ru##.l-main.js-main div.c-block:has(div.c-header:contains(Реклама))";
        // rules = [ruleText];
        // assert.ok(validator.validate(rules).length > 0);

        ruleText = 'drive2.ru##.l-main.js-main div.c-block:has(> div.c-header)';
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        selector = "[-ext-has='script:contains(var banner)']";
        ruleText = `w3schools.com##${selector}`;
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        selector = "[-ext-has='script:inject(var banner)']";
        ruleText = `w3schools.com##${selector}`;
        rules = [ruleText];
        expect(validator.validate(rules)).toHaveLength(0);
    });

    it('Test ext-css validation - complicated cases', () => {
        let ruleText;
        let rules;

        ruleText = 'doodhwali.com##.container .col-xs-12 .col-xs-12 > .yellow:not(:nth-child(3))';
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        ruleText = 'w3schools.com##.todaystripe:after';
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        ruleText = 'puls4.com##.media-actions-list > li:not(:nth-child(3)):not(:nth-child(4))';
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        ruleText = 'salamnews.org##.snlikebt > ul > li:not(:nth-child(4)):not(:nth-child(5))';
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        ruleText = 'posta.com.tr##.detail-share-item > a:not([href*="window.print()"])';
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        ruleText = 'disk.yandex.az,disk.yandex.by,disk.yandex.co.il,disk.yandex.com,disk.yandex.com.am,disk.yandex.com.ge,disk.yandex.com.tr,disk.yandex.ee,disk.yandex.fr,disk.yandex.kg,disk.yandex.kz,disk.yandex.lt,disk.yandex.lv,disk.yandex.md,disk.yandex.ru,disk.yandex.tj,disk.yandex.tm,disk.yandex.ua,disk.yandex.uz,yadi.sk##.share-link-popup__menu > div.menu__group:last-child > div.menu__item:not(:last-child):not(:nth-child(3))';
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        ruleText = 'fullfilmihdizlesene.com###sidebar > .sidebarborder:not(:nth-child(3))';
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        ruleText = 'pan.baidu.com,music.baidu.com,yun.baidu.com##[class|=ad]';
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        rules = ['better.com#$##header-floating\ navbar { position: absolute !important; }',
            'bongino.com#$##site-header\ 1 > .site-header-main { height: 167.3px !important; }',
            'deadline.com#$#.pmc-u-background-white.\/\/.header__bar { position: relative !important; transform: translateY(0) !important; }',
            'engadget.com#$#.o-sticky_header\@tp- { position: relative !important; }',
            'sports.yahoo.com#$##atomic .Mt\(headerHeight\) { margin-top: 22px !important; }',
            'texasmonthly.com#$##\#novella-header { position: relative !important; top: 0 !important; }'];
        expect(validator.validate(rules)).toHaveLength(6);

        rules = ["sports.yahoo.com#$##atomic .Mt\(headerHeight\) { margin-top: \\'22px\\' !important; }",
            "better.com#$##header-floating\ navbar { font-family: \\'Blogger\\'; }"];
        expect(validator.validate(rules)).toHaveLength(0);
    });

    it('Test ext-css validation - complicated cases', () => {
        let ruleText;
        let rules;

        ruleText = 'example.com##div:has-text(/test-xpath-content/):xpath(../../..)';
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        ruleText = 'example.com##div:xpath(//*[@class="test-xpath-class"])';
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        ruleText = 'example.com##div.test-nth-ancestor-marker:nth-ancestor(4)';
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        ruleText = 'example.com##div:xpath(../../..):has-text(/test-xpath-content/)';
        rules = [ruleText];
        expect(validator.validate(rules)).toHaveLength(0);

        ruleText = 'example.com##div:nth-ancestor(999)';
        rules = [ruleText];
        expect(validator.validate(rules)).toHaveLength(0);

        ruleText = 'example.com##div:xpath()';
        rules = [ruleText];
        expect(validator.validate(rules)).toHaveLength(0);
    });

    it('Test ext-css validation - invalid pseudo classes', () => {
        let ruleText;
        let rules;

        ruleText = 'yandex.ru##[-ext-has=test]:matches(.whatisthis)';
        rules = [ruleText];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        // Invalid pseudo class
        ruleText = 'yandex.ru##[-ext-has=test]:matches(.whatisthis), .todaystripe:contains(test)';
        rules = [ruleText];
        expect(validator.validate(rules)).toHaveLength(0);
    });

    it('Test content rules validation', () => {
        let rules = ['~nigma.ru,google.com$$div[id=\"ad_text\"][wildcard=\"*teasernet*tararar*\"]'];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        rules = ['~nigma.ru,google.com$$div[id=\"ad_text\"][tag-content=\"teas\"\"ernet\"][max-length=\"500\"][min-length=\"50\"][wildcard=\"*.adriver.*\"][parent-search-level=\"15\"][parent-elements=\"td,table\"]'];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        rules = ['~nigma.ru,google.com$$div[id=\"ad_text\"][max-length=\"500000\"][min-length=\"50\"]'];
        expect(validator.validate(rules).length).toBeGreaterThan(0);
    });

    it('Test validation - various rules', () => {
        let rules = ['||onedrive.su/code/bshow.php$empty,important,~websocket'];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        rules = ['||4ksport.pl^$all'];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        rules = ['||onedrive.su/code/bshow.php$cookie=cookie_name'];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        rules = ['||onedrive.su/code/bshow.php$empty,important,stealth'];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        rules = ['samdan.com.tr,esquire.com.tr##div[data-mbzone="Textlink" i] > div#id_d_textlink'];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        rules = ["example.com##div[class^='textLink' i]"];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        rules = ['example.com#?#section:has(div[class^="textLink" i])',
            '##img[alt*="example.org" i]',
            '##img[alt*="QQ998" i]',
            '##[href*="35.200.169.1" i] > img',
            'aszdziennik.pl##a[href*="/aszdziennik" i] > img[src^="/static/media/"]'];
        expect(validator.validate(rules)).toHaveLength(5);

        rules = ['example.com##div[class^="textLink"i]',
            'example.com##div[class^=textLink i]',
            'example.com##div[class name="textLink" i]',
            'example.com##div[class^="textLink" "textColor" i]'];
        expect(validator.validate(rules)).toHaveLength(0);

        rules = ['||delivery.tf1.fr/pub$media,rewrite=abp-resource:blank-mp3,domain=tf1.fr'];
        expect(validator.validate(rules).length).toBeGreaterThan(0);

        rules = ['||delivery.tf1.fr/pub$media,rewrite=resource:blank-mp3,domain=tf1.fr',
            '||delivery.tf1.fr/pub$media,rewrite,domain=tf1.fr'];
        expect(validator.validate(rules)).toHaveLength(0);

        rules = [
            't',
            'tt',
            'ads',
            '##q',
            '||q',
        ];
        expect(validator.validate(rules)).toHaveLength(0);

        let actual = validator.validate(['']);
        let expected = [''];
        expect(actual).toStrictEqual(expected);

        actual = validator.validate(undefined);
        expected = [];
        expect(actual).toStrictEqual(expected);
    });

    it('Test validation - validate redirect option', () => {
        const validRedirectRule1 = 'onedrive.su/code/bshow.php$redirect';
        const validRedirectRule2 = 'onedrive.su/code/bshow.php$important,redirect';
        const validImportantRule3 = 'onedrive.su/code/bshow.php$important';
        const nonValidRule = 'onedrive.su/code/bshow.php$nonvalid';

        const rules = [
            validRedirectRule1,
            validRedirectRule2,
            validImportantRule3,
            nonValidRule,
        ];

        const validateRules = validator.validate(rules);

        expect(validateRules.indexOf(validRedirectRule1)).toBeGreaterThanOrEqual(0);
        expect(validateRules.indexOf(validRedirectRule2)).toBeGreaterThanOrEqual(0);
        expect(validateRules.indexOf(validImportantRule3)).toBeGreaterThanOrEqual(0);
        expect(validateRules.indexOf(nonValidRule)).toBe(-1);
        expect(validator.validate(rules)).toHaveLength(3);
    });

    it('Test validation - validate rules with $', () => {
        const validRedirectRule1 = 'zen.yandex.by,zen.yandex.com,zen.yandex.com.tr,zen.yandex.fr,zen.yandex.kz,zen.yandex.ru,zen.yandex.ua#?#.feed__item:-abp-has(*:-abp-contains(/^реклама$/i))';

        const rules = [
            validRedirectRule1,
        ];

        const validateRules = validator.validate(rules);

        expect(validateRules.indexOf(validRedirectRule1)).toBeGreaterThan(-1);
        expect(validateRules.length).toBeGreaterThan(0);
    });

    it('Test validation - incorrect domain option', () => {
        let rules = ['|http*$domain='];
        expect(validator.validate(rules)).toHaveLength(0);

        rules = ['|http*$~domain=|example.org'];
        expect(validator.validate(rules)).toHaveLength(0);

        rules = ['|http*$script,domain=|example.org'];
        expect(validator.validate(rules)).toHaveLength(0);
    });

    it('Test validation - cosmetic css rules', () => {
        let rules = ['example.com#$#body { background: black; }'];
        expect(validator.validate(rules)).toHaveLength(1);

        rules = ['example.com#$#body { background: url("https://some.jpg"); }'];
        expect(validator.validate(rules)).toHaveLength(0);

        rules = ['example.com#$#body { background: \\75 rl("https://some.jpg"); }'];
        expect(validator.validate(rules)).toHaveLength(0);

        rules = ['example.com#$#body[style*="background-image: url()"] { margin-top: 45px !important; }'];
        expect(validator.validate(rules)).toHaveLength(1);

        rules = ['example.com#$#body[style*="background-image: url(\'https://some.jpg\')"] { background: url() !important; }'];
        expect(validator.validate(rules)).toHaveLength(0);

        rules = ['hotline.ua#$#body.reset-scroll:before { z-index: -9999!important; display: none!important; }',
            'hotline.ua##body.reset-scroll::before',
            'hotline.ua##body.reset-scroll::after'];
        expect(validator.validate(rules)).toHaveLength(3);

        rules = ['sleazyneasy.com##.video-holder > .video-options::after',
            'northumberlandgazette.co.uk##div[class^="sc-"]::before'];
        expect(validator.validate(rules)).toHaveLength(2);

        rules = ['sleazyneasy.com##.video-holder > .video-options ::after',
            'northumberlandgazette.co.uk##div[class^="sc-"]:::before'];
        expect(validator.validate(rules)).toHaveLength(0);
    });

    it('Test ##^script:has-text and $$script[tag-containts] rules', () => {
        let rules = ['example.com##^script:contains(/.+banner/)'];
        expect(validator.validate(rules)).toHaveLength(0);

        rules = ['example.com##^script:has-text(/\.advert/)'];
        expect(validator.validate(rules)).toHaveLength(0);
    });

    it('Test scriptlets lib validator', () => {
        let result = scriptlets.isValidScriptletName('abort-on-property-read');
        expect(result).toBeTruthy();

        result = scriptlets.isValidScriptletName('abort-on--property-read');
        expect(result).toBeFalsy();

        result = scriptlets.isValidScriptletRule('test.com#%#//scriptlet("ubo-abort-current-inline-script.js", "Math.random", "adbDetect")');
        expect(result).toBeTruthy();

        result = scriptlets.isUboScriptletRule('example.com#@#+js(nano-setInterval-booster.js, some.example, 1000)');
        expect(result).toBeTruthy();

        result = scriptlets.isUboScriptletRule('test.com##script:inject(json-prune.js)');
        expect(result).toBeTruthy();

        result = scriptlets.isUboScriptletRule('test.com#%#//scriptlet(\'ubo-json-prune.js\')');
        expect(result).toBeFalsy();

        result = scriptlets.isAdgScriptletRule('test.com#%#//scriptlet(\'ubo-json-prune.js\')');
        expect(result).toBeTruthy();

        result = scriptlets.isAdgScriptletRule('test.com#%#//scriptlet("abort-on-property-read", "some.prop")');
        expect(result).toBeTruthy();

        result = scriptlets.isAdgScriptletRule('test.com#@#script:inject(abort-on-property-read.js, some.prop)');
        expect(result).toBeFalsy();

        result = scriptlets.isAbpSnippetRule('example.com#@$#abort-on-property-write adblock.check');
        expect(result).toBeTruthy();

        result = scriptlets.isAbpSnippetRule('test.com#@#script:inject(abort-on-property-read.js, some.prop)');
        expect(result).toBeFalsy();
    });

    it('Test scriptlets validator', () => {
        let rules = [
            'test.com#%#//scriptlet("ubo-abort-current-inline-script.js", "Math.random", "adbDetect")',
            'example.com#@%#//scriptlet("ubo-disable-newtab-links.js")',
            'example.com#%#//scriptlet("abp-abort-current-inline-script", "console.log", "Hello")',
            'example.com#@%#//scriptlet("abort-on-property-write", "adblock.check")',
            'example.com#%#//scriptlet(\'abort-on-property-read\', \'ads.prop\')',
            'example.com#%#//scriptlet("prevent-adfly")',
            'example.com#@%#//scriptlet("ubo-nano-setInterval-booster", "some.example", "1000")',
        ];
        expect(validator.validate(rules)).toHaveLength(7);

        rules = [
            'test.com#%#//scriptlet("ubo-abort-current-inline-scripts.js", "Math.random", "adbDetect")',
            'example.com#%#//scriptlet("abp-abort-current-inline-script ", "console.log", "Hello")',
            'example.com#@%#//scriptlet("abort-on--property-write", "adblock.check")',
        ];
        expect(validator.validate(rules)).toHaveLength(0);

        rules = [
            'test.com#%#//scriptlet(abort-current-inline-script", "Math.random", "adbDetect")',
            'example.com#@%#//scriptlet("ubo-nano-setInterval-booster.js, "some.example", "1000")',
            'example.com#%#//scriptlet("abp-abort-current-inline-script", console.log", "Hello")',
        ];
        expect(validator.validate(rules)).toHaveLength(0);
    });

    it('Test redirects validator', () => {
        let rules = ['||delivery.tf1.fr/pub$media,redirect=noopmp3-0.1s,domain=tf1.fr',
            '||example.com/banner$image,redirect=32x32-transparent.png',
            '||example.com/*.mp4$media,redirect=noopmp4-1s',
            '||googletagservices.com/test.js$domain=test.com,redirect=googletagservices-gpt'];
        expect(validator.validate(rules)).toHaveLength(4);

        rules = ['||podu.me/ads/audio/*.mp3$redirect=noopmp3-0.1s',
            '||podu.me/ads/audio/*.mp3$media,redirect=noopmp3-0.1s'];
        expect(validator.validate(rules)).toHaveLength(2);

        rules = ['||example.com^$script,redirect=noopjs.js',
            '||example.com/banner$image,redirect=3x3.png',
            '||googletagservices.com/test.js$domain=test.com,redirect=googletagservices_gpt.js',
            '||example.com/banner$image,redirect=1x1.gif',
            '||example.com/*.mp4$media,redirect=noopmp4_1s'];
        expect(validator.validate(rules)).toHaveLength(0);

        // TODO we really should test scriptlets in this library?
        const { redirects } = scriptlets;

        let rule = '||example.com^$script,redirect=noopjs.js';
        expect(redirects.isValidAdgRedirectRule(rule)).toBeFalsy();

        rule = '||example.com^$script,redirect=noopjs';
        expect(redirects.isValidAdgRedirectRule(rule)).toBeTruthy();

        rule = '||example.com^$script,redirects=noopjs';
        expect(redirects.isValidAdgRedirectRule(rule)).toBeFalsy();

        rule = '||example.com&redirects=noopjs^$script';
        expect(redirects.isValidAdgRedirectRule(rule)).toBeFalsy();

        rule = '||example.com/banner$image,redirect=32x32transparent.png';
        expect(redirects.isAdgRedirectRule(rule)).toBeTruthy();

        rule = '||example.com/banner$image,redirect=32x32transparent.png';
        expect(redirects.isValidAdgRedirectRule(rule)).toBeFalsy();

        rule = '||tvn.adocean.pl/*ad.xml$xmlhttprequest,redirect=noopvast-2.0,domain=tvn24.pl';
        expect(redirects.isValidAdgRedirectRule(rule)).toBeTruthy();

        rule = '||vast.kinogo.by/code/video-steam/?id=$redirect=noopvast-2.0';
        expect(redirects.isValidAdgRedirectRule(rule)).toBeTruthy();

        rule = '||strm.yandex.ru/get/$script,redirect=noopvast-2.0,domain=kinopoisk.ru';
        expect(redirects.isValidAdgRedirectRule(rule)).toBeTruthy();

        rule = '||strm.yandex.ru/get/$script,redirect=noopvast-2.0,domain=kinopoisk.ru';
        expect(redirects.isValidAdgRedirectRule(rule)).toBeTruthy();
    });

    it('Test blocking rules with regexp', () => {
        let rules = [
            '/ex[[ampl[[e\.com\///.*\/banner/$script',
            '/^htt[[[ps?:\/\/.*(bitly|bit)\.(com|ly)\//$domain=1337x.to',
            '/\.sharesix\.com/.*[a-zA-Z0-9]({4}/$script',
        ];
        expect(validator.validate(rules)).toHaveLength(0);

        rules = [
            '/^https:\/\/([a-z]+\.)?sythe\.org\/\[=%#@$&!^].*[\w\W]{20,}/$image',
            '/^https?:\/\/.*(bitly|bit)\.(com|ly)\//$domain=1337x.to',
            '/^https?:\/\/.*(powvideo|powvldeo|povvideo).*\.*[?&$=&!]/$script,subdocument',
        ];
        expect(validator.validate(rules)).toHaveLength(3);
    });
});