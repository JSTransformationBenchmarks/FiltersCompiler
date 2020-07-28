/* eslint-disable max-len */
const sorter = require('../main/sorting.js');

// Mock log to hide error messages
jest.mock('../main/utils/log');

describe('sorting test', () => {
    it('Test sorting script', () => {
        const before = `
!
||graph.facebook.com^$domain=jp.gocro.smartnews.android
||graph.facebook.com^$domain=com.zynga.crosswordswithfriends
||graph.facebook.com^$domain=com.urbandroid.sleep
! razlozhi.ru|yandex.by|yandex.com.tr|yandex.kz|yandex.ru|yandex.ua|syl.ru
/:\/\/(otzovik.com)\/[a-zA-Z0-9-_]*==\//$script,domain=otzovik.com
/:\/\/(otzovik.com)\/[a-zA-Z0-9-_]*=\//$script,domain=otzovik.com
!
! comment 
!+ PLATFORM(iOS, ext_safari)
||oops.rustorka.com^
!
://*.rumedia.ws^$empty,domain=~rumedia.ws
rustorka.com##a[href^="http://www.gearbest.com/"]
rustorka.com##div[align="center"] > a > img
/(rustorka.com\/forum\/misc\/js\/(?!ifix)(?!ajax)(?!main)(?!fancybox)(?!scrolltopcontrol)(?!jquery)(?!ct)(?!bbcode))/$domain=rustorka.com
@@||rustorka.com/forum/shoutbox_view.php
!+ PLATFORM(ext_ff, ext_opera, ext_ublock)
rustorka.com##.post_body > div[align="center"] > a > img
!
myfin1.by##.menu_level_1 > li.left_bt
myfin2.by##.menu_level_1 > li.left_bt
myfin3.by##.menu_level_1 > li.left_bt
myfin4.by##.menu_level_1 > li.left_bt
bgoperator.ru##.l-index__side_a > canvas[width="188"][height="312"]
razlozhi.ru##._23 > div._68._36
tourister.ru##body > div[onclick="TourWindowCClose();"]
torrent-games.net###ubm_div
inosmi.ru##.banner
||r.mradx.net/img/D2/C79060.mp4
||r.mradx.net/img/20/9D02B4.ogg
esports.mail.ru##.rb-video-widget
esports.mail.ru##a.b-bg[target="_blank"]
seedoff.cc##div[id*="Composite"]
||r.mradx.net/img/D2/C79060.mp4
||r.mradx.net/img/20/9D02B4.ogg
esports.mail.ru##.rb-video-widget
esports.mail.ru##a.b-bg[target="_blank"]
seedoff.cc##div[id*="Composite"]
||animespirit.ru/banners/
fotokto.ru###pageContainer > div[class="m2"]
||simpsonsua.com.ua/photos/baner-reklama/
||cy-pr.com/images/stat/tr.png
miytvideo.ru##body > noindex
goldenshara.net##center > a[href="/goldenshara.net.php?url"] > img
zaycev.online##div[data-cookie="mainBanner"]
||bazr.ru/vast?$xmlhttprequest
||image.winudf.com/*/upload/promopure/$domain=apkpure.com
24auto.ru##.brrr_place
mp3cc.com###headerBanner
mp3cc.com##.playlist-ad
mp3cc.com###footerBanner
anistar.me##body > div[class^="heade-"]
chatovod.ru##.chatlist > tbody > tr[class="bold"]:not([class^="chatitem"])
||chatovod.ru/i/promo2/workle.png`;

        const after = sorter.sort(before.split('\n'));
        expect(after).toBeDefined();
        expect(after).toHaveLength(45);

        const correct = `!
||graph.facebook.com^$domain=com.urbandroid.sleep|com.zynga.crosswordswithfriends|jp.gocro.smartnews.android
! razlozhi.ru|yandex.by|yandex.com.tr|yandex.kz|yandex.ru|yandex.ua|syl.ru
/:\/\/(otzovik.com)\/[a-zA-Z0-9-_]*=\//$script,domain=otzovik.com
/:\/\/(otzovik.com)\/[a-zA-Z0-9-_]*==\//$script,domain=otzovik.com
!
! comment
!+ PLATFORM(iOS, ext_safari)
||oops.rustorka.com^
!
rustorka.com##a[href^="http://www.gearbest.com/"]
rustorka.com##div[align="center"] > a > img
/(rustorka.com\/forum\/misc\/js\/(?!ifix)(?!ajax)(?!main)(?!fancybox)(?!scrolltopcontrol)(?!jquery)(?!ct)(?!bbcode))/$domain=rustorka.com
://*.rumedia.ws^$empty,domain=~rumedia.ws
@@||rustorka.com/forum/shoutbox_view.php
!+ PLATFORM(ext_ff, ext_opera, ext_ublock)
rustorka.com##.post_body > div[align="center"] > a > img
!
mp3cc.com###footerBanner
mp3cc.com###headerBanner
fotokto.ru###pageContainer > div[class="m2"]
torrent-games.net###ubm_div
razlozhi.ru##._23 > div._68._36
inosmi.ru##.banner
24auto.ru##.brrr_place
chatovod.ru##.chatlist > tbody > tr[class="bold"]:not([class^="chatitem"])
bgoperator.ru##.l-index__side_a > canvas[width="188"][height="312"]
myfin1.by,myfin2.by,myfin3.by,myfin4.by##.menu_level_1 > li.left_bt
mp3cc.com##.playlist-ad
esports.mail.ru##.rb-video-widget
esports.mail.ru##a.b-bg[target="_blank"]
anistar.me##body > div[class^="heade-"]
tourister.ru##body > div[onclick="TourWindowCClose();"]
miytvideo.ru##body > noindex
goldenshara.net##center > a[href="/goldenshara.net.php?url"] > img
zaycev.online##div[data-cookie="mainBanner"]
seedoff.cc##div[id*="Composite"]
||animespirit.ru/banners/
||bazr.ru/vast?$xmlhttprequest
||chatovod.ru/i/promo2/workle.png
||cy-pr.com/images/stat/tr.png
||image.winudf.com/*/upload/promopure/$domain=apkpure.com
||r.mradx.net/img/20/9D02B4.ogg
||r.mradx.net/img/D2/C79060.mp4
||simpsonsua.com.ua/photos/baner-reklama/`;

        for (let i = 0; i < after.length; i += 1) {
            expect(after[i].trim()).toBe(correct.split('\n')[i].trim());
        }
    });

    it('Test sorting script - elemhide rules', () => {
        const before = `
bgoperator.ru##.l-index__side_a > canvas[width="188"][height="312"]
chatovod.ru##.chatlist > tbody > tr[class="bold"]:not([class^="chatitem"])
myfin1.by,myfin2.by##.menu_level_1 > li.left_bt
myfin3.by,myfin2.by##.menu_level_1 > li.left_bt`;

        const after = sorter.sort(before.split('\n'));
        expect(after).toBeDefined();
        expect(after).toHaveLength(3);
        expect(after[0]).toBe('chatovod.ru##.chatlist > tbody > tr[class="bold"]:not([class^="chatitem"])');
        expect(after[1]).toBe('bgoperator.ru##.l-index__side_a > canvas[width="188"][height="312"]');
        expect(after[2]).toBe('myfin1.by,myfin2.by,myfin3.by##.menu_level_1 > li.left_bt');
    });

    it('Test sorting script - url blocking rules', () => {
        const before = `
||graph.facebook.com^$domain=jp.gocro.smartnews.android|onemore.ru
||graph.facebook.com^$domain=com.zynga.crosswordswithfriends
||graph.facebook.com^$domain=com.urbandroid.sleep
||graph.facebook.com^$domain=com.urbandroid.imp,important
||chatovod.ru/i/promo2/workle.png
||image.winudf.com/*/upload/promopure/$~third-party,empty,domain=apkpure.com
r.mradx.net/img/20/9D02B4.ogg
||r.mradx.net/img/D2/C79060.mp4`;

        const after = sorter.sort(before.split('\n'));

        expect(after);
        expect(after).toHaveLength(6);
        expect(after[0]).toBe('r.mradx.net/img/20/9D02B4.ogg');
        expect(after[1]).toBe('||chatovod.ru/i/promo2/workle.png');
        expect(after[2]).toBe('||graph.facebook.com^$domain=com.urbandroid.imp,important');
        expect(after[3]).toBe('||graph.facebook.com^$domain=com.urbandroid.sleep|com.zynga.crosswordswithfriends|jp.gocro.smartnews.android|onemore.ru');
        expect(after[4]).toBe('||image.winudf.com/*/upload/promopure/$~third-party,empty,domain=apkpure.com');
        expect(after[5]).toBe('||r.mradx.net/img/D2/C79060.mp4');
    });

    it('Test sorting script - comments', () => {
        const before = `! razlozhi.ru|yandex.by|yandex.com.tr|yandex.kz|yandex.ru|yandex.ua|syl.ru
/:\/\/(otzovik.com)\/[a-zA-Z0-9-_]*=\//$script,domain=otzovik.com
/:\/\/(otzovik.com)\/[a-zA-Z0-9-_]*==\//$script,domain=otzovik.com
!
! comment`;

        const after = sorter.sort(before.split('\n'));

        expect(after).toBeDefined();
        expect(after).toHaveLength(5);
        expect(after.join('\n').trim()).toBe(before.trim());
    });
});