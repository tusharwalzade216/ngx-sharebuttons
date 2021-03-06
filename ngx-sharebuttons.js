import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Injectable, InjectionToken, Input, NgModule, Output, Pipe, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable as Observable$1 } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FacebookButton {
    /**
     * @param {?} prop
     * @param {?} http
     */
    constructor(prop, http$$1) {
        this.prop = prop;
        this.http = http$$1;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    link(url) {
        return this.prop.shareUrl + url;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    count(url) {
        return this.http.get(this.prop.countUrl + url)
            .filter(res => !!(res.share && res.share.share_count))
            .map(res => +res.share.share_count)
            .catch(err => Observable$1.empty());
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TwitterButton {
    /**
     * @param {?} prop
     */
    constructor(prop) {
        this.prop = prop;
    }
    /**
     * @param {?} url
     * @param {?=} args
     * @return {?}
     */
    link(url, args) {
        let /** @type {?} */ shareUrl = this.prop.shareUrl + url;
        if (args.description) {
            shareUrl += '&text=' + args.description;
        }
        if (args.via) {
            shareUrl += '&via=' + args.via;
        }
        if (args.tags) {
            shareUrl += '&hashtags=' + args.tags;
        }
        return shareUrl;
    }
    /**
     * @return {?}
     */
    count() {
        return Observable$1.empty();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class LinkedinButton {
    /**
     * @param {?} prop
     * @param {?} http
     */
    constructor(prop, http$$1) {
        this.prop = prop;
        this.http = http$$1;
    }
    /**
     * @param {?} url
     * @param {?=} args
     * @return {?}
     */
    link(url, args) {
        let /** @type {?} */ shareUrl = this.prop.shareUrl + url;
        if (args.title) {
            shareUrl += '&title=' + args.title;
        }
        if (args.description) {
            shareUrl += '&summary=' + args.description;
        }
        return shareUrl;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    count(url) {
        return this.http.jsonp(this.prop.countUrl + url, 'callback')
            .filter(res => !!res.count)
            .map(res => +res.count)
            .catch(err => Observable$1.empty());
    }
}
/**
 * LinkedIn count interface
 * @record
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TumblrButton {
    /**
     * @param {?} prop
     * @param {?} http
     */
    constructor(prop, http$$1) {
        this.prop = prop;
        this.http = http$$1;
    }
    /**
     * @param {?} url
     * @param {?=} args
     * @return {?}
     */
    link(url, args) {
        let /** @type {?} */ shareUrl = this.prop.shareUrl + url;
        if (args.description) {
            shareUrl += '&caption=' + args.description;
        }
        if (args.tags) {
            shareUrl += '&tags=' + args.tags;
        }
        return shareUrl;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    count(url) {
        return this.http.jsonp(this.prop.countUrl + url, 'callback')
            .filter(res => !!(res.response && res.response.note_count))
            .map(res => +res.response.note_count)
            .catch(err => Observable$1.empty());
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class WhatsappButton {
    /**
     * @param {?} prop
     */
    constructor(prop) {
        this.prop = prop;
    }
    /**
     * @param {?} url
     * @param {?=} args
     * @return {?}
     */
    link(url, args) {
        let /** @type {?} */ shareUrl = this.prop.shareUrl;
        if (args.description) {
            shareUrl += args.description + ' %0A';
        }
        return shareUrl + url;
    }
    /**
     * @return {?}
     */
    count() {
        return Observable$1.empty();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PinterestButton {
    /**
     * @param {?} prop
     * @param {?} http
     */
    constructor(prop, http$$1) {
        this.prop = prop;
        this.http = http$$1;
    }
    /**
     * @param {?} url
     * @param {?=} args
     * @return {?}
     */
    link(url, args) {
        let /** @type {?} */ shareUrl = this.prop.shareUrl + url;
        /** The description and the image are required to get the pin button to work. */
        if (args.description) {
            shareUrl += '&description=' + args.description;
        }
        else if (document) {
            /**
             * If user didn't add description, get it from the OG meta tag
             */
            const /** @type {?} */ ogDescription = document.querySelector('meta[property="og:description"]');
            if (ogDescription) {
                shareUrl += '&description=' + ogDescription.getAttribute('content');
            }
            else {
                console.warn('[ShareButtons]: You didn\'t set the description text for Pinterest button');
            }
        }
        if (args.image) {
            shareUrl += '&media=' + args.image;
        }
        else if (document) {
            const /** @type {?} */ ogImage = document.querySelector('meta[property="og:image"]');
            if (ogImage) {
                shareUrl += '&media=' + ogImage.getAttribute('content');
            }
            else {
                console.warn('[ShareButtons]: You didn\'t set the image URL for Pinterest button');
            }
        }
        return shareUrl;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    count(url) {
        return this.http.get(this.prop.countUrl + url, { responseType: 'text' })
            .map(text => /** @type {?} */ (JSON.parse(text.replace(/^receiveCount\((.*)\)/, '$1'))))
            .filter(res => !!res.count)
            .map(res => +res.count)
            .catch(err => Observable$1.empty());
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class RedditButton {
    /**
     * @param {?} prop
     * @param {?} http
     */
    constructor(prop, http$$1) {
        this.prop = prop;
        this.http = http$$1;
    }
    /**
     * @param {?} url
     * @param {?=} args
     * @return {?}
     */
    link(url, args) {
        let /** @type {?} */ shareUrl = this.prop.shareUrl + url;
        if (args.title) {
            shareUrl += '&title=' + args.title;
        }
        return shareUrl;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    count(url) {
        return this.http.get(this.prop.countUrl + url)
            .filter(res => !!(res.data && res.data.children && res.data.children.length))
            .map(res => +res.data.children[0].data.score)
            .catch(err => Observable$1.empty());
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GoogleButton {
    /**
     * @param {?} prop
     * @param {?} http
     */
    constructor(prop, http$$1) {
        this.prop = prop;
        this.http = http$$1;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    link(url) {
        return this.prop.shareUrl + url;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    count(url) {
        return Observable$1.empty();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class StumbleButton {
    /**
     * @param {?} prop
     */
    constructor(prop) {
        this.prop = prop;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    link(url) {
        return this.prop.shareUrl + url;
    }
    /**
     * @return {?}
     */
    count() {
        return Observable$1.empty();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TelegramButton {
    /**
     * @param {?} prop
     */
    constructor(prop) {
        this.prop = prop;
    }
    /**
     * @param {?} url
     * @param {?=} args
     * @return {?}
     */
    link(url, args) {
        let /** @type {?} */ shareUrl = this.prop.shareUrl + url;
        if (args.description) {
            shareUrl += '&text=' + args.description;
        }
        return shareUrl;
    }
    /**
     * @return {?}
     */
    count() {
        return Observable$1.empty();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class EmailButton {
    /**
     * @param {?} prop
     */
    constructor(prop) {
        this.prop = prop;
    }
    /**
     * @param {?} url
     * @param {?=} args
     * @return {?}
     */
    link(url, args) {
        let /** @type {?} */ shareUrl = this.prop.shareUrl + args.email;
        if (args.title) {
            shareUrl += '&subject=' + args.title;
        }
        shareUrl += '&body=';
        if (args.description) {
            shareUrl += args.description + ' %0A';
        }
        return shareUrl + url;
    }
    /**
     * @return {?}
     */
    count() {
        return Observable$1.empty();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CopyButton {
    /**
     * @param {?} prop
     */
    constructor(prop) {
        this.prop = prop;
    }
    /**
     * @param {?} url
     * @param {?=} args
     * @return {?}
     */
    link(url, args) {
        this.copyURLToClipboard(url, args.directive);
        return null;
    }
    /**
     * @return {?}
     */
    count() {
        return Observable$1.empty();
    }
    /**
     * copy URL to clipboard
     * @param {?} url
     * @param {?} directive
     * @return {?}
     */
    copyURLToClipboard(url, directive) {
        const /** @type {?} */ temp = { text: directive.shareButton.prop.text, icon: directive.shareButton.prop.icon };
        Observable$1.of({}).take(1).do(() => {
            url = decodeURIComponent(url);
            const /** @type {?} */ textArea = directive.renderer.createElement('textarea');
            // Place in top-left corner of screen regardless of scroll position.
            directive.renderer.setStyle(textArea, 'position', 'fixed');
            directive.renderer.setStyle(textArea, 'top', 0);
            directive.renderer.setStyle(textArea, 'left', 0);
            // Ensure it has a small width and height. Setting to 1px / 1em
            // doesn't work as directive gives a negative w/h on some browsers.
            directive.renderer.setStyle(textArea, 'width', '2em');
            directive.renderer.setStyle(textArea, 'height', '2em');
            // We don't need padding, reducing the size if it does flash render
            directive.renderer.setStyle(textArea, 'padding', 0);
            // Clean up any borders.
            directive.renderer.setStyle(textArea, 'border', 'none');
            directive.renderer.setStyle(textArea, 'outline', 'none');
            directive.renderer.setStyle(textArea, 'boxShadow', 'none');
            // Avoid flash of white box if rendered for any reason.
            directive.renderer.setStyle(textArea, 'background', 'transparent');
            directive.renderer.setProperty(textArea, 'value', url);
            directive.renderer.appendChild(directive.el, textArea);
            textArea.select();
            document.execCommand('copy');
            directive.renderer.removeChild(directive.el, textArea);
            directive.shareButton.prop.text = this.prop.successText;
            directive.shareButton.prop.icon = this.prop.successIcon;
            directive.cd.markForCheck();
        }, () => {
            directive.shareButton.prop.text = this.prop.failText;
            directive.shareButton.prop.icon = this.prop.failIcon;
            directive.cd.markForCheck();
            console.warn('[ShareButtons]: Print button could not copy URL to clipboard');
        })
            .delay(2000)
            .do(() => {
            directive.shareButton.prop.text = temp.text;
            directive.shareButton.prop.icon = temp.icon;
            directive.cd.markForCheck();
        })
            .subscribe();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PrintButton {
    /**
     * @param {?} prop
     */
    constructor(prop) {
        this.prop = prop;
    }
    /**
     * @param {?} url
     * @param {?=} args
     * @return {?}
     */
    link(url, args) {
        args.directive.window.print();
        return null;
    }
    /**
     * @return {?}
     */
    count() {
        return Observable$1.empty();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class VKontakteButton {
    /**
     * @param {?} prop
     */
    constructor(prop) {
        this.prop = prop;
    }
    /**
     * @param {?} url
     * @param {?=} args
     * @return {?}
     */
    link(url, args) {
        return this.prop.shareUrl + url;
    }
    /**
     * @return {?}
     */
    count() {
        return Observable$1.empty();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const Buttons = {
    facebook: {
        type: 'facebook',
        text: 'Facebook',
        icon: 'fa fa-facebook',
        color: '#3b5998',
        supportCount: true,
        shareUrl: 'https://www.facebook.com/sharer/sharer.php?u=',
        androidUrl: 'com.facebook.katana',
        iosUrl: 'fb://',
        countUrl: 'https://graph.facebook.com?id='
    },
    twitter: {
        type: 'twitter',
        text: 'Twitter',
        icon: 'fa fa-twitter',
        color: '#00acee',
        supportCount: false,
        shareUrl: 'https://twitter.com/intent/tweet?url=',
        androidUrl: 'com.twitter.package',
        iosUrl: 'twitter://tweet?url='
    },
    google: {
        type: 'google',
        text: 'Google+',
        icon: 'fa fa-google-plus',
        color: '#DB4437',
        supportCount: false,
        shareUrl: 'https://plus.google.com/share?url=',
        androidUrl: '',
        iosUrl: '',
    },
    linkedin: {
        type: 'linkedin',
        text: 'LinkedIn',
        icon: 'fa fa-linkedin',
        color: '#006fa6',
        supportCount: true,
        shareUrl: 'http://www.linkedin.com/shareArticle?url=',
        androidUrl: 'com.linkedin.android',
        iosUrl: 'linkedin://',
        countUrl: 'https://www.linkedin.com/countserv/count/share?url='
    },
    pinterest: {
        type: 'pinterest',
        text: 'Pinterest',
        icon: 'fa fa-pinterest-p',
        color: '#BD091D',
        supportCount: true,
        shareUrl: 'https://in.pinterest.com/pin/create/button/?url=',
        androidUrl: '',
        iosUrl: '',
        countUrl: 'https://api.pinterest.com/v1/urls/count.json?callback=receiveCount&url='
    },
    reddit: {
        type: 'reddit',
        text: 'Reddit',
        icon: 'fa fa-reddit-alien',
        color: '#FF4006',
        supportCount: true,
        shareUrl: 'http://www.reddit.com/submit?url=',
        androidUrl: '',
        iosUrl: '',
        countUrl: 'https://buttons.reddit.com/button_info.json?url='
    },
    tumblr: {
        type: 'tumblr',
        text: 'Tumblr',
        icon: 'fa fa-tumblr',
        color: '#36465D',
        supportCount: true,
        shareUrl: 'http://tumblr.com/widgets/share/tool?canonicalUrl=',
        androidUrl: '',
        iosUrl: '',
        countUrl: 'https://api.tumblr.com/v2/share/stats?url='
    },
    print: {
        type: 'print',
        text: 'Print',
        icon: 'fa fa-print',
        color: 'brown',
        supportCount: false
    },
    stumble: {
        type: 'stumble',
        text: 'Stumble',
        icon: 'fa fa-stumbleupon',
        color: '#eb4924',
        supportCount: false,
        shareUrl: 'http://www.stumbleupon.com/submit?url=',
        androidUrl: '',
        iosUrl: ''
    },
    telegram: {
        type: 'telegram',
        text: 'Telegram',
        icon: 'fa fa-send',
        color: '#0088cc',
        supportCount: false,
        shareUrl: 'https://t.me/share/url?url=',
        androidUrl: '',
        iosUrl: ''
    },
    vk: {
        type: 'vk',
        text: 'VKontakte',
        icon: 'fa fa-vk',
        color: '#4C75A3',
        supportCount: false,
        shareUrl: 'http://vk.com/share.php?url=',
        androidUrl: '',
        iosUrl: ''
    },
    copy: {
        type: 'copy',
        text: 'Copy link',
        successText: 'Copied',
        successIcon: 'fa fa-check',
        failText: 'Error',
        failIcon: 'fa fa-exclamation',
        icon: 'fa fa-link',
        color: '#607D8B',
        supportCount: false
    },
    whatsapp: {
        type: 'whatsapp',
        text: 'WhatsApp',
        icon: 'fa fa-whatsapp',
        color: '#25D366',
        supportCount: false,
        shareUrl: 'https://api.whatsapp.com/send?text=',
        androidUrl: 'com.whatsapp.package',
        iosUrl: 'whatsapp://?text='
    },
    email: {
        type: 'email',
        text: 'Email',
        icon: 'fa fa-envelope',
        color: '#32A1A3',
        supportCount: false,
        shareUrl: 'mailto:?'
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const OPTIONS = new InjectionToken('OPTIONS');
const BUTTONS_META = new InjectionToken('BUTTONS_META');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ShareButtonsService {
    /**
     * @param {?} http
     * @param {?} options
     * @param {?} meta
     */
    constructor(http$$1, options, meta) {
        this.http = http$$1;
        /**
         * All buttons
         */
        this.allButtons = [
            'facebook',
            'twitter',
            'linkedin',
            'pinterest',
            'google',
            'stumble',
            'reddit',
            'whatsapp',
            'tumblr',
            'vk',
            'telegram',
            'email',
            'copy',
            'print'
        ];
        /**
         * Default options
         */
        this.options = {
            theme: 'default',
            dialogWidth: 500,
            dialogHeight: 400,
            include: this.allButtons,
            exclude: [],
            size: 0,
            title: null,
            image: null,
            description: null,
            tags: null,
            gaTracking: false,
            twitterAccount: null
        };
        /**
         * Button's meta data such as icon,color and text of each button
         */
        this.meta = Buttons;
        /** Override global options with user's preference */
        this.options = mergeDeep(this.options, options);
        this.meta = mergeDeep(this.meta, meta);
    }
    /**
     * @return {?}
     */
    get twitterAccount() {
        return this.options.twitterAccount;
    }
    /**
     * @return {?}
     */
    get dialogSize() {
        return `width=${this.options.dialogWidth}, height=${this.options.dialogHeight}`;
    }
    /**
     * Get all wanted buttons
     * @return {?}
     */
    get buttons() {
        if (!this.options.exclude.length) {
            return this.options.include;
        }
        return this.options.include.filter((btn) => this.options.exclude.indexOf(btn) < 0);
    }
    /**
     * @return {?}
     */
    get theme() {
        return this.options.theme;
    }
    /**
     * Global meta tags
     * @return {?}
     */
    get title() {
        return this.options.title;
    }
    /**
     * @return {?}
     */
    get description() {
        return this.options.description;
    }
    /**
     * @return {?}
     */
    get image() {
        return this.options.image;
    }
    /**
     * @return {?}
     */
    get tags() {
        return this.options.tags;
    }
    /**
     * @return {?}
     */
    get gaTracking() {
        return this.options.gaTracking;
    }
    /**
     * @return {?}
     */
    get size() {
        return this.options.size;
    }
    /**
     * @param {?} buttonName
     * @return {?}
     */
    createShareButton(buttonName) {
        switch (buttonName.toLowerCase()) {
            case this.meta.facebook.type:
                return new FacebookButton(this.meta.facebook, this.http);
            case this.meta.twitter.type:
                return new TwitterButton(this.meta.twitter);
            case this.meta.google.type:
                return new GoogleButton(this.meta.google, this.http);
            case this.meta.pinterest.type:
                return new PinterestButton(this.meta.pinterest, this.http);
            case this.meta.linkedin.type:
                return new LinkedinButton(this.meta.linkedin, this.http);
            case this.meta.reddit.type:
                return new RedditButton(this.meta.reddit, this.http);
            case this.meta.tumblr.type:
                return new TumblrButton(this.meta.tumblr, this.http);
            case this.meta.stumble.type:
                return new StumbleButton(this.meta.stumble);
            case this.meta.whatsapp.type:
                return new WhatsappButton(this.meta.whatsapp);
            case this.meta.vk.type:
                return new VKontakteButton(this.meta.vk);
            case this.meta.telegram.type:
                return new TelegramButton(this.meta.telegram);
            case this.meta.email.type:
                return new EmailButton(this.meta.email);
            case this.meta.copy.type:
                return new CopyButton(this.meta.copy);
            case this.meta.print.type:
                return new PrintButton(this.meta.print);
            default:
                return null;
        }
    }
    /**
     * Determine the mobile operating system.
     * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
     * @return {?}
     */
    getMobileOS() {
        // const userAgent = navigator.userAgent || navigator.vendor || (window || global).opera;
        // Windows Phone must come first because its UA also contains "Android"
        // if (/windows phone/i.test(userAgent)) {
        //   return 'WindowsPhone';
        // }
        // if (/android/i.test(userAgent)) {
        //   return 'Android';
        // }
        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        // if (/iPad|iPhone|iPod/.test(userAgent) && !(window || global).MSStream) {
        //   return 'iOS';
        // }
        return undefined;
    }
}
ShareButtonsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ShareButtonsService.ctorParameters = () => [
    { type: HttpClient, },
    { type: undefined, decorators: [{ type: Inject, args: [OPTIONS,] },] },
    { type: undefined, decorators: [{ type: Inject, args: [BUTTONS_META,] },] },
];
/**
 * Simple object check.
 * @param {?} item
 * @return {?}
 */
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
/**
 * Deep merge two objects.
 * @param {?} target
 * @param {...?} sources
 * @return {?}
 */
function mergeDeep(target, ...sources) {
    if (!sources.length) {
        return target;
    }
    const /** @type {?} */ source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (const /** @type {?} */ key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} });
                }
                mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return mergeDeep(target, ...sources);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UniversalSupportService {
    /**
     * @return {?}
     */
    get nativeWindow() {
        try {
            return window;
        }
        catch (/** @type {?} */ e) {
            return global;
        }
    }
}
UniversalSupportService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
UniversalSupportService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ShareButtonDirective {
    /**
     * @param {?} share
     * @param {?} renderer
     * @param {?} cd
     * @param {?} el
     * @param {?} universal
     */
    constructor(share, renderer, cd, el, universal) {
        this.share = share;
        this.renderer = renderer;
        this.cd = cd;
        /**
         * Share meta tags
         */
        this.sbTitle = this.share.title;
        this.sbDescription = this.share.description;
        this.sbImage = this.share.image;
        this.sbTags = this.share.tags;
        /**
         * Google analytics tracking
         */
        this.gaTracking = this.share.gaTracking;
        /**
         * Share count event
         */
        this.sbCount = new EventEmitter();
        /**
         * Share dialog opened event
         */
        this.sbOpened = new EventEmitter();
        /**
         * Share dialog closed event
         */
        this.sbClosed = new EventEmitter();
        this.el = el.nativeElement;
        this.window = universal.nativeWindow;
    }
    /**
     * Set share button e.g facebook, twitter...etc
     * @param {?} buttonName
     * @return {?}
     */
    set createButton(buttonName) {
        /**
         * Create a new button of type <buttonName>
         */
        const /** @type {?} */ button = this.share.createShareButton(buttonName);
        if (button) {
            this.shareButton = button;
            /** Remove old button class in case user changed the button */
            this.renderer.removeClass(this.el, 'sb-' + this.buttonClass);
            /** Add new button class e.g.: sb-facebook, sb-twitter ...etc */
            this.renderer.addClass(this.el, 'sb-' + button.prop.type);
            /** Keep a copy of current class */
            this.buttonClass = button.prop.type;
            /** Get link's shared count */
            this.getCount();
        }
        else {
            throw new Error(`[ShareButtons]: The share button "${buttonName}" does not exist. Make sure the button name is correct!`);
        }
    }
    /**
     * Set share URL
     * @param {?} url
     * @return {?}
     */
    set sbUrl(url) {
        /** Check if current URL equals previous URL */
        if (url !== this.url) {
            this.url = this.validateUrl(url);
            this.getCount();
        }
    }
    /**
     * Open share dialog
     * @return {?}
     */
    onClick() {
        /** Set user did not set the url using [sbUrl], use window URL */
        if (!this.url) {
            this.url = encodeURIComponent(this.window.location.href);
        }
        /**
         * Get sharing link
         */
        const /** @type {?} */ shareUrl = this.shareButton.link(this.url, {
            title: this.sbTitle,
            description: this.sbDescription,
            image: this.sbImage,
            tags: this.sbTags,
            mobile: this.share.getMobileOS(),
            via: this.share.twitterAccount,
            directive: this
        });
        /** GA tracking */
        if (this.gaTracking && typeof ga !== 'undefined') {
            ga('send', 'social', this.shareButton.prop.type, 'click', this.url);
        }
        let /** @type {?} */ popUp;
        if (shareUrl) {
            /** Open share dialog */
            popUp = this.window.open(shareUrl, 'newwindow', this.share.dialogSize);
        }
        /** Emit opened dialog type */
        this.sbOpened.emit(this.shareButton.prop.type);
        /** If dialog closed event has subscribers, emit closed dialog type */
        if (this.sbClosed.observers.length && popUp) {
            const /** @type {?} */ pollTimer = this.window.setInterval(() => {
                if (popUp.closed) {
                    this.window.clearInterval(pollTimer);
                    this.sbClosed.emit(this.shareButton.prop.type);
                }
            }, 200);
        }
    }
    /**
     * @return {?}
     */
    getCount() {
        /** Only if share count has observers & the button has support for share count */
        if (this.url && this.sbCount.observers.length && this.shareButton.prop.supportCount) {
            /** Emit share count to (sbCount) Output */
            this.shareButton.count(this.url).subscribe((count) => this.sbCount.emit(count));
        }
    }
    /**
     * @param {?} url
     * @return {?}
     */
    validateUrl(url) {
        /** Use encodeURIComponent to let URLs with the hash location strategy to work in tweets */
        if (url) {
            const /** @type {?} */ r = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            if (r.test(url)) {
                return encodeURIComponent(url);
            }
            console.warn(`[ShareButtons]: The share URL "${url}" is invalid!`);
        }
        /** fallback to current page URL */
        return encodeURIComponent(this.window.location.href);
    }
}
ShareButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: '[shareButton]'
            },] },
];
/** @nocollapse */
ShareButtonDirective.ctorParameters = () => [
    { type: ShareButtonsService, },
    { type: Renderer2, },
    { type: ChangeDetectorRef, },
    { type: ElementRef, },
    { type: UniversalSupportService, },
];
ShareButtonDirective.propDecorators = {
    "sbTitle": [{ type: Input },],
    "sbDescription": [{ type: Input },],
    "sbImage": [{ type: Input },],
    "sbTags": [{ type: Input },],
    "createButton": [{ type: Input, args: ['shareButton',] },],
    "sbUrl": [{ type: Input },],
    "gaTracking": [{ type: Input },],
    "sbCount": [{ type: Output },],
    "sbOpened": [{ type: Output },],
    "sbClosed": [{ type: Output },],
    "onClick": [{ type: HostListener, args: ['click',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NFormatterPipe {
    /**
     * @param {?} num
     * @param {?=} digits
     * @return {?}
     */
    transform(num, digits) {
        if (typeof num !== 'number') {
            num = 1;
        }
        return nFormatter(num, digits);
    }
}
NFormatterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'nFormatter'
            },] },
];
/** @nocollapse */
NFormatterPipe.ctorParameters = () => [];
/**
 * Change share counts to a readable number e.g 35.6k
 */
const nFormatter = (num, digits) => {
    const /** @type {?} */ si = [
        { value: 1E18, symbol: 'E' },
        { value: 1E15, symbol: 'P' },
        { value: 1E12, symbol: 'T' },
        { value: 1E9, symbol: 'G' },
        { value: 1E6, symbol: 'M' },
        { value: 1E3, symbol: 'K' }
    ], /** @type {?} */ rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    for (let /** @type {?} */ i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
        }
    }
    return num.toFixed(digits).replace(rx, '$1');
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} httpClient
 * @param {?} options
 * @param {?} buttonsMeta
 * @return {?}
 */
function ShareButtonsFactory$2(httpClient, options, buttonsMeta) {
    return new ShareButtonsService(httpClient, options, buttonsMeta);
}
class ShareDirectiveModule {
    /**
     * @param {?=} options
     * @param {?=} buttonsMeta
     * @return {?}
     */
    static forRoot(options, buttonsMeta) {
        return {
            ngModule: ShareDirectiveModule,
            providers: [
                { provide: OPTIONS, useValue: options },
                { provide: BUTTONS_META, useValue: buttonsMeta },
                {
                    provide: ShareButtonsService,
                    useFactory: ShareButtonsFactory$2,
                    deps: [HttpClient, OPTIONS, BUTTONS_META]
                }
            ]
        };
    }
}
ShareDirectiveModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ShareButtonDirective,
                    NFormatterPipe
                ],
                imports: [
                    CommonModule
                ],
                exports: [
                    CommonModule,
                    ShareButtonDirective,
                    NFormatterPipe
                ],
                providers: [UniversalSupportService]
            },] },
];
/** @nocollapse */
ShareDirectiveModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ShareButtonComponent {
    /**
     * @param {?} cd
     * @param {?} share
     */
    constructor(cd, share) {
        this.cd = cd;
        this.share = share;
        /**
         * Show button icon
         */
        this.showIcon = true;
        /**
         * Show button name
         */
        this.showName = false;
        /**
         * Button size
         */
        this.size = this.share.size;
        /**
         * Get and display share count
         */
        this.showCount = false;
        /**
         * Set theme as button class
         */
        this.buttonClass = 'sb-button sb-' + this.share.theme;
        /**
         * Share count event
         */
        this.count = new EventEmitter();
        /**
         * Share dialog opened event
         */
        this.opened = new EventEmitter();
        /**
         * Share dialog closed event
         */
        this.closed = new EventEmitter();
    }
    /**
     * @param {?} button
     * @return {?}
     */
    set createButton(button) {
        this.shareCount = 0;
        this.button = button;
    }
    /**
     * on set share URL
     * @param {?} newUrl
     * @return {?}
     */
    set setUrl(newUrl) {
        /** Reset share count when url changes */
        this.shareCount = 0;
        this.url = newUrl;
    }
    /**
     * @param {?} show
     * @return {?}
     */
    set setShowCount(show) {
        this.showCount = show;
        /** Subscribe to count event */
        /** Check if sbCount has observers already, don't subscribe again */
        if (!this.shareDirective.sbCount.observers.length) {
            /** Subscribe to the directive count's event only if 'show' is true or 'sbCount' has observers */
            if (this.showCount || this.count.observers.length) {
                this.shareDirective.sbCount.subscribe(count => {
                    this.shareCount = count;
                    this.count.emit(count);
                    this.cd.markForCheck();
                });
            }
        }
    }
    /**
     * Button theme
     * @param {?} theme
     * @return {?}
     */
    set setTheme(theme) {
        this.buttonClass = 'sb-button sb-' + theme;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.shareDirective.sbCount.complete();
    }
}
ShareButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'share-button',
                template: `
    <button class="sb-wrapper"
            [shareButton]="button"
            [sbUrl]="url"
            [sbImage]="image"
            [sbTitle]="title"
            [sbDescription]="description"
            [sbTags]="tags"
            (sbOpened)="opened.emit($event)"
            (sbClosed)="closed.emit($event)"
            [class.sb-show-count]="showCount && shareCount"
            [class.sb-show-template]="template.innerText?.length"
            [class.sb-show-text]="showName && !template.childElementCount"
            [class.sb-show-icon]="showIcon && !template.childElementCount"
            [style.fontSize.px]="(1 + size/20) * 14">

      <div class="sb-inner">

        <!-- HIDE BUTTON'S ICON AND TEXT IF CUSTOM TEMPLATE IS USED -->

        <div class="sb-content" *ngIf="!template.childElementCount">

          <!-- BUTTON ICON -->
          <div *ngIf="showIcon" class="sb-icon">
            <i [class]="shareDirective.shareButton.prop.icon" aria-hidden="true"></i>
          </div>

          <!-- BUTTON TEXT -->
          <div *ngIf="showName" class="sb-text">
            {{ shareDirective.shareButton.prop.text }}
          </div>

        </div>

        <!-- FOR CUSTOM TEMPLATE -->
        <div #template class="sb-template">
          <ng-content></ng-content>
        </div>

        <!-- BUTTON COUNT -->
        <div *ngIf="showCount && shareCount" class="sb-count">
          <span>{{ shareCount | nFormatter }}</span>
        </div>

      </div>
    </button>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ShareButtonComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: ShareButtonsService, },
];
ShareButtonComponent.propDecorators = {
    "createButton": [{ type: Input, args: ['button',] },],
    "setUrl": [{ type: Input, args: ['url',] },],
    "title": [{ type: Input },],
    "description": [{ type: Input },],
    "image": [{ type: Input },],
    "tags": [{ type: Input },],
    "showIcon": [{ type: Input },],
    "showName": [{ type: Input },],
    "size": [{ type: Input },],
    "setShowCount": [{ type: Input, args: ['showCount',] },],
    "setTheme": [{ type: Input, args: ['theme',] },],
    "buttonClass": [{ type: HostBinding, args: ['class',] },],
    "count": [{ type: Output },],
    "opened": [{ type: Output },],
    "closed": [{ type: Output },],
    "shareDirective": [{ type: ViewChild, args: [ShareButtonDirective,] },],
    "template": [{ type: ViewChild, args: ['template',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} httpClient
 * @param {?} options
 * @param {?} buttonsMeta
 * @return {?}
 */
function ShareButtonsFactory$1(httpClient, options, buttonsMeta) {
    return new ShareButtonsService(httpClient, options, buttonsMeta);
}
class ShareButtonModule {
    /**
     * @param {?=} options
     * @param {?=} buttonsMeta
     * @return {?}
     */
    static forRoot(options, buttonsMeta) {
        return {
            ngModule: ShareButtonModule,
            providers: [
                { provide: OPTIONS, useValue: options },
                { provide: BUTTONS_META, useValue: buttonsMeta },
                {
                    provide: ShareButtonsService,
                    useFactory: ShareButtonsFactory$1,
                    deps: [HttpClient, OPTIONS, BUTTONS_META]
                }
            ]
        };
    }
}
ShareButtonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ShareButtonComponent
                ],
                imports: [
                    ShareDirectiveModule
                ],
                exports: [
                    ShareDirectiveModule,
                    ShareButtonComponent
                ]
            },] },
];
/** @nocollapse */
ShareButtonModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ShareButtonsComponent {
    /**
     * @param {?} cd
     * @param {?} share
     */
    constructor(cd, share) {
        this.cd = cd;
        this.share = share;
        /**
         * Share Buttons array
         */
        this.buttons = [];
        /**
         * Buttons to include
         */
        this.includeButtons = this.share.buttons;
        /**
         * Buttons to exclude
         */
        this.excludeButtons = [];
        /**
         * Number of shown buttons
         */
        this.shownButtons = this.includeButtons.length;
        /**
         * Disable more/less buttons
         */
        this.showAll = false;
        /**
         * Show button icon
         */
        this.showIcon = true;
        /**
         * Show button name
         */
        this.showName = false;
        /**
         * Get and display share count
         */
        this.showCount = false;
        /**
         * Set theme as buttons' container class
         */
        this.containerClass = 'sb-group sb-' + this.share.theme;
        /**
         * Share count event
         */
        this.count = new EventEmitter();
        /**
         * Share dialog opened event
         */
        this.opened = new EventEmitter();
        /**
         * Share dialog closed event
         */
        this.closed = new EventEmitter();
    }
    /**
     * @param {?} includeButtons
     * @return {?}
     */
    set include(includeButtons) {
        this.includeButtons = includeButtons;
        this.buttons = this.includeButtons.filter((btn) => this.excludeButtons.indexOf(btn) < 0);
    }
    /**
     * @param {?} excludeButtons
     * @return {?}
     */
    set exclude(excludeButtons) {
        this.excludeButtons = excludeButtons;
        this.buttons = this.includeButtons.filter((btn) => this.excludeButtons.indexOf(btn) < 0);
    }
    /**
     * @param {?} shownCount
     * @return {?}
     */
    set setShownButtons(shownCount) {
        this.shownButtons = shownCount;
        this.totalButtons = this.buttons.length;
        /** Set showAll to true if shown buttons count = selected buttons count */
        this.showAll = this.shownButtons === this.totalButtons + 1;
    }
    /**
     * Set share URL
     * @param {?} newUrl
     * @return {?}
     */
    set setUrl(newUrl) {
        /** Reset share count on url changes */
        this.shareCount = 0;
        this.url = newUrl;
    }
    /**
     * @param {?} show
     * @return {?}
     */
    set setShowCount(show) {
        this.showCount = show;
        if (this.shareComponents) {
            /** Subscribe to count event */
            this.shareComponents.forEach((shareComponent) => {
                /** Check if sbCount has observers already, don't subscribe again */
                if (!shareComponent.count.observers.length) {
                    /** Subscribe to the component count event (only if [showCount]=true) */
                    if (show || this.count.observers.length) {
                        shareComponent.count.subscribe(count => {
                            this.shareCount = count;
                            this.count.emit(count);
                            this.cd.markForCheck();
                        });
                    }
                }
            });
        }
    }
    /**
     * @param {?} theme
     * @return {?}
     */
    set setTheme(theme) {
        /** Set buttons' theme to override the default theme */
        this.theme = theme;
        /** Set buttons' container theme */
        this.containerClass = 'sb-group sb-' + theme;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /**  if use didn't select the buttons use all */
        if (!this.excludeButtons.length) {
            this.buttons = this.includeButtons.filter((btn) => this.excludeButtons.indexOf(btn) < 0);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.shareComponents.forEach((shareComponent) => {
            shareComponent.count.unsubscribe();
        });
    }
    /**
     * @return {?}
     */
    more() {
        this.totalButtons = this.shownButtons;
        this.shownButtons = this.buttons.length;
        this.showAll = true;
    }
    /**
     * @return {?}
     */
    less() {
        this.shownButtons = this.totalButtons;
        this.showAll = false;
    }
}
ShareButtonsComponent.decorators = [
    { type: Component, args: [{
                selector: 'share-buttons',
                template: `
    <share-button *ngFor="let button of buttons | slice: 0:shownButtons" 
      [button]="button" 
      [theme]="theme"
      [url]="url"
      [title]="title"
      [description]="description" 
      [image]="image" 
      [tags]="tags" 
      [showCount]="showCount" 
      [showIcon]="showIcon" 
      [showName]="showName"
      [size]="size" 
      (opened)="opened.emit($event)" 
      (closed)="closed.emit($event)"></share-button>

    <div [class]="'sb-button sb-' + theme" 
      [style.fontSize.px]="(1 + size/20) * 14">

      <!-- SHOW LESS BUTTON -->

      <button *ngIf="showAll && shownButtons === buttons.length" 
              class="sb-wrapper sb-more sb-show-icon" (click)="less()">

        <div class="sb-inner">
          <div class="sb-content">
            <div class="sb-icon"><i class="fa fa-minus" aria-hidden="true"></i></div>
          </div>
        </div>
      </button>

      <!-- SHOW MORE BUTTON -->

        <button *ngIf="!showAll && shownButtons < buttons.length"
                class="sb-wrapper sb-more sb-show-icon" (click)="more()">
      
          <div class="sb-inner">
            <div class="sb-content">
              <div class="sb-icon"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></div>
            </div>
          </div>
        </button>

    </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ShareButtonsComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: ShareButtonsService, },
];
ShareButtonsComponent.propDecorators = {
    "include": [{ type: Input, args: ['include',] },],
    "exclude": [{ type: Input, args: ['exclude',] },],
    "setShownButtons": [{ type: Input, args: ['show',] },],
    "setUrl": [{ type: Input, args: ['url',] },],
    "title": [{ type: Input },],
    "description": [{ type: Input },],
    "image": [{ type: Input },],
    "tags": [{ type: Input },],
    "showIcon": [{ type: Input },],
    "showName": [{ type: Input },],
    "size": [{ type: Input },],
    "setShowCount": [{ type: Input, args: ['showCount',] },],
    "setTheme": [{ type: Input, args: ['theme',] },],
    "containerClass": [{ type: HostBinding, args: ['class',] },],
    "count": [{ type: Output },],
    "opened": [{ type: Output },],
    "closed": [{ type: Output },],
    "shareComponents": [{ type: ViewChildren, args: [ShareButtonComponent,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} httpClient
 * @param {?} options
 * @param {?} buttonsMeta
 * @return {?}
 */
function ShareButtonsFactory(httpClient, options, buttonsMeta) {
    return new ShareButtonsService(httpClient, options, buttonsMeta);
}
class ShareButtonsModule {
    /**
     * @param {?=} options
     * @param {?=} buttonsMeta
     * @return {?}
     */
    static forRoot(options, buttonsMeta) {
        return {
            ngModule: ShareButtonsModule,
            providers: [
                { provide: OPTIONS, useValue: options },
                { provide: BUTTONS_META, useValue: buttonsMeta },
                {
                    provide: ShareButtonsService,
                    useFactory: ShareButtonsFactory,
                    deps: [HttpClient, OPTIONS, BUTTONS_META]
                }
            ]
        };
    }
}
ShareButtonsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ShareButtonsComponent
                ],
                imports: [
                    ShareButtonModule
                ],
                exports: [
                    ShareButtonModule,
                    ShareButtonsComponent
                ]
            },] },
];
/** @nocollapse */
ShareButtonsModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { ShareButtonsModule, ShareButtonModule, ShareDirectiveModule, ShareButtonDirective, ShareButtonComponent, ShareButtonsComponent, ShareButtonsService, NFormatterPipe, ShareButtonsFactory$1 as ɵb, ShareButtonsFactory as ɵa, ShareButtonsFactory$2 as ɵc, BUTTONS_META as ɵf, OPTIONS as ɵe, UniversalSupportService as ɵg };
//# sourceMappingURL=ngx-sharebuttons.js.map
