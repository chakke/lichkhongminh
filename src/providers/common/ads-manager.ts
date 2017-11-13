import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

export class AdsManager {

    mAdmobFree: AdMobFree;

    mTimeCheck: number = 0;

    mAdsEnable: boolean = true;

    public setAdmobFree(admobFree: AdMobFree) {
        if (!admobFree) return;
        if (!this.mAdmobFree) {
            this.mAdmobFree = admobFree;
        }
    }

    public load(data: any) {
        if ('enable' in data) {
            this.mAdsEnable = data.enable;
        }

        if (this.mAdsEnable) {
            let adsConfig = data[data.platform];

            this.mAdmobFree.banner.config(adsConfig.banner);
            if (adsConfig.banner.autoShow) {
                this.mAdmobFree.banner.prepare();
            }

            this.mAdmobFree.interstitial.config(adsConfig.interstitial);


            this.mAdmobFree.interstitial.prepare();
        }
    }

    public showInterstital(force: boolean = true) {
        if (!this.mAdsEnable) return;
        if (force) {
            this.mAdmobFree.interstitial.show();
            return;
        }
        this.mTimeCheck++;
        if (this.mTimeCheck >= 10) {
            if (this.mAdmobFree) this.mAdmobFree.interstitial.show();
            this.mTimeCheck = 0;
        }
    }


}