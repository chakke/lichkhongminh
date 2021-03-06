
import { Injectable } from '@angular/core';
import { DepartureHttpService } from "./departure-http-service";
import { HttpService } from "../http-service";
import { ResponseCode, RequestState, LoginStatus } from '../app-constant';
import { DepartureLoadData } from './departure-loaddata';
import { DepartureObject } from './class/departure-object';
import { AppConfig } from '../app-config';
import { Http, HttpModule } from '@angular/http';
import { AdsManager } from "../common/ads-manager";
import { AnalyticsManager } from "../common/analytics-manager";
import { ZODIAC } from './zodiac-image';
import { XEMND } from './departure-XEMND';
import { DepartureUtils } from "./departure-utils";
import { Utils } from "../app-utils";
import { BackgroundController } from "./controller/background-controller";

@Injectable()
export class DepartureModule {
  public mBackgroundController: BackgroundController;
  public mAdsManager: AdsManager;
  public mAnalyticsManager: AnalyticsManager;
  private mDepartureHttpService: DepartureHttpService;
  private mDepartureLoadData: DepartureLoadData;
  private departureData: any;
  private dayDetailData: any;
  private trucData: any;
  private tietData: any;
  private taiThan_hyThan: any;
  private sao_tot_data: any;
  private special_data: any;
  private cavalVNAL: any;
  private cavalVNDL: any;
  private vankhan_data: any;



  private mConfig: AppConfig;
  public mIsOnIOSDevice: boolean = true;
  constructor(


    private mHttpService: HttpService,
    private http: Http) {
    this.mDepartureHttpService = new DepartureHttpService(this.mHttpService);
    this.mDepartureLoadData = new DepartureLoadData(this.http);
    this.mConfig = new AppConfig();
    this.mAdsManager = new AdsManager();
    this.mAnalyticsManager = new AnalyticsManager();
    this.mBackgroundController = new BackgroundController();

  }
  getAdsManager() {
    return this.mAdsManager;
  }
  getAnalyticsManager() {
    return this.mAnalyticsManager;
  }

  getBackgroundController(): BackgroundController {
    return this.mBackgroundController;
  }



  getNewDepartureObject(date: Date) {
    return new DepartureObject(date);
  }

  public getAppConfig() {
    return this.mConfig;
  }

  public loadConfig() {
    return new Promise((resolve, reject) => {
      if (this.mConfig.hasData()) {
        resolve();
      } else {
        this.mHttpService.getHttp().request("assets/config/lichkhongminh.json").subscribe(
          data => {
            this.mConfig.onResponseConfig(data.json());
            this.mBackgroundController.onData(this.mConfig.get("backgrounds"));
            resolve();
          }
        );
      }
    });
  }


  public getHttpService() {
    return this.mDepartureHttpService;
  }

  //đổi ngày dương về ngày âm
  public convertSolarToLunar(dd: any, mm: any, yy: any) {
    return DepartureUtils.convertSolar2Lunar(dd, mm, yy, 7);
  }
  //doi ngay am ve ngay duong
  public convertLunarToSolar(dd: any, mm: any, yy: any) {
    return DepartureUtils.convertLunar2Solar(dd, mm, yy, 7);
  }

  public update() {
    this.getData();
  }

  getData() {
    return new Promise((resolve, reject) => {
      if (this.departureData) resolve(this.departureData);
      else {
        this.mDepartureLoadData.getDataFromJSON().subscribe((data) => {
          this.departureData = data;
          resolve(this.departureData);
        });
      }
    });
  }

  getDayDetailDataJSON() {
    return new Promise((resolve, reject) => {
      if (this.dayDetailData) resolve(this.dayDetailData);
      else {
        this.mDepartureLoadData.getDayDetailFromJSON().subscribe((data) => {
          this.dayDetailData = data;
          resolve(this.dayDetailData);
        });
      }
    });
  }

  getTrucDataJSON() {
    return new Promise((resolve, reject) => {
      if (this.trucData) resolve(this.trucData);
      else {
        this.mDepartureLoadData.getTrucDataFromJSON().subscribe((data) => {
          this.trucData = data;
          resolve(this.trucData);
        });
      }
    });
  }
  getTietDataJSON() {
    return new Promise((resolve, reject) => {
      if (this.tietData) resolve(this.tietData);
      else {
        this.mDepartureLoadData.getTietDataFromJSON().subscribe((data) => {
          this.tietData = data;
          resolve(this.tietData);
        });
      }
    });
  }

  getTaiThanHyThanDataJSON() {
    return new Promise((resolve, reject) => {
      if (this.taiThan_hyThan) resolve(this.taiThan_hyThan);
      else {
        this.mDepartureLoadData.getTaiThanHyThanFromJSON().subscribe((data) => {
          this.taiThan_hyThan = data;
          resolve(this.taiThan_hyThan);
        });
      }
    });
  }

  getSaoTotSaoXauDataJSON() {
    return new Promise((resolve, reject) => {
      if (this.sao_tot_data) resolve(this.sao_tot_data);
      else {
        this.mDepartureLoadData.getSaoTotSaoXauDataFromJSON().subscribe((data) => {
          this.sao_tot_data = data;
          resolve(this.sao_tot_data);
        });
      }
    });
  }

  getSpecialDataJSON() {
    return new Promise((resolve, reject) => {
      if (this.special_data) resolve(this.special_data);
      else {
        this.mDepartureLoadData.getSpecialDataFromJSON().subscribe((data) => {
          this.special_data = data;
          resolve(this.special_data);
        });
      }
    });
  }

  getCavalVNALDataJSON() {
    return new Promise((resolve, reject) => {
      if (this.cavalVNAL) resolve(this.cavalVNAL);
      else {
        this.mDepartureLoadData.getLeVietNamAmLichDataFromJSON().subscribe((data) => {
          this.cavalVNAL = data;
          resolve(this.cavalVNAL);
        });
      }
    });
  }
  getCavalVNDLDataJSON() {
    return new Promise((resolve, reject) => {
      if (this.cavalVNDL) resolve(this.cavalVNDL);
      else {
        this.mDepartureLoadData.getLeVietNamDuongLichDataFromJSON().subscribe((data) => {
          this.cavalVNDL = data;
          resolve(this.cavalVNDL);
        });
      }
    });
  }

  getVanKhanDataJSON() {
    return new Promise((resolve, reject) => {
      if (this.vankhan_data) resolve(this.vankhan_data);
      else {
        this.mDepartureLoadData.getVanKhanDataFromJSON().subscribe((data) => {
          this.vankhan_data = data;
          resolve(this.vankhan_data);
        });
      }
    });
  }

  getGiaiMongDataJSON() {
    return new Promise((resolve, reject) => {
      this.mDepartureLoadData.getGiaiMongDataFromJSON().subscribe((data) => {
        resolve(data);
      });
    });
  }
  getZodiacDataJSON() {
    return new Promise((resolve, reject) => {
      this.mDepartureLoadData.getZodiacFromJSON().subscribe((data) => {
        resolve(data);
      });
    });
  }
  getSelectDateDataJSON() {
    return new Promise((resolve, reject) => {
      this.mDepartureLoadData.getSelectDateFromJSON().subscribe((data) => {
        resolve(data);
      });
    });
  }
  getNumberRichDataJSON() {
    return new Promise((resolve, reject) => {
      this.mDepartureLoadData.getNumberRichFromJSON().subscribe((data) => {
        resolve(data);
      });
    });
  }
  getXEMNDDataJSON(link: string) {
    return new Promise((resolve, reject) => {
      this.mDepartureLoadData.getXEMNDFromJSON(link).subscribe((data) => {
        resolve(data);
      });
    });
  }
  updateDepartureInfo(departures: Array<DepartureObject>) {
    if (this.departureData) {
      departures.forEach(departure => {
        if (departure) {
          let data = this.getQuoteAndNameOfDay(departure.lunarDate, departure.lunarMonth);
          departure.nameOfDay = data[0];
          departure.comment = data[1];
        }
      });
      return departures;
    }
    else {
      return this.getData().then(() => {
        departures.forEach(departure => {
          if (departure) {
            let data = this.getQuoteAndNameOfDay(departure.lunarDate, departure.lunarMonth);
            departure.nameOfDay = data[0];
            departure.comment = data[1];
          }
        });
        return departures;
      })
    }
  }

  //lấy thông tin về ngày xuất hành
  public getDepartureData() {
    return this.mDepartureLoadData.getDataFromJSON();
  }

  public getDayDetailData() {
    return this.mDepartureLoadData.getDayDetailFromJSON();
  }

  public getTrucData() {
    return this.mDepartureLoadData.getTrucDataFromJSON();
  }

  public getVanKhanValue() {
    if (this.vankhan_data) {
      return this.vankhan_data;
    }
  }

  /**
   * getTietData
   */
  public getTietData() {
    return this.mDepartureLoadData.getTietDataFromJSON();
  }

  public getTaiThanHyThanData() {
    return this.mDepartureLoadData.getTaiThanHyThanFromJSON();
  }
  //tính can chi cho giờ (theo ngày dương lịch)
  public getSexagesimalCycleByTime(dd: any, mm: any, yy: any, hour: number) {
    return DepartureUtils.getSexagesimalCycleByTime(dd, mm, yy, hour);
  }

  //tính can chi cho ngày (theo ngày dương lịch)
  public getSexagesimalCycleByDay(dd: any, mm: any, yy: any) {
    return DepartureUtils.getSexagesimalCycleByDay(dd, mm, yy);
  }
  //tính can chi cho tháng (theo ngày dương lịch)
  public getSexagesimalCycleByMonth(dd: any, mm: any, yy: any) {
    return DepartureUtils.getSexagesimalCycleByMonth(dd, mm, yy);
  }
  //tính can chi cho năm (theo ngày dương lịch)
  public getSexagesimalCycleByYear(dd: any, mm: any, yy: any) {
    return DepartureUtils.getSexagesimalCycleByYear(dd, mm, yy);
  }
  //lấy tên ngày và lời khuyên cho ngày theo lịch khổng minh
  public getQuoteAndNameOfDay(dd: any, mm: any, data?: any) {
    if (!data) {
      data = this.departureData;
    }
    return this.mDepartureLoadData.getInfoDayInMonth(dd, mm, data);
  }
  //lấy thông tin tinh tú trong thập nhị bát sao
  public GetTNBINFO(dd: number, mm: number, yy: number, data?: any) {
    if (!data) {
      data = this.dayDetailData;
    }
    return this.mDepartureLoadData.GetTNBINFO(dd, mm, yy, data);
  }

  //lấy thông tin về trực của ngày
  public getTrucDay(lunarMonth: number, chi: string, data?: any) {
    if (!data) {
      data = this.trucData;
    }
    return DepartureUtils.getTrucDay(lunarMonth, chi, data);
  }
  // Lấy thông tin về ngày Tiết
  public getTietDay(date: number, month: number, data?: any) {
    if (!data) {
      data = this.tietData;
    }
    return DepartureUtils.getTietDay(date, month, data);
  }
  //Tính ngày hoàng đạo, hắc đạo
  public getZodiacDay(dd: any, mm: any, yy: any) {
    return DepartureUtils.getZodiacDay(dd, mm, yy);
  }

  /**Lấy background của app khi đổi ngày, mm, yy tính theo lịch âm */
  public getBackgroundImage(mm: number, yy: number) {
    let month: number = Utils.clamp(mm, 0, 30) + 1;
    return "background_" + month + ".png";
  }

  public getZodiacImage(index: number): string {
    return ZODIAC[index - 1];
  }


  public getXEMND() {
    return XEMND;
  }

  public getHourBetterAndBad(chi: string) {
    return DepartureUtils.getHoursBetterAndBad(chi);
  }

  public getTaiThanHyThan(canchi: string, data?: any) {
    if (!data) {
      data = this.taiThan_hyThan;
    }
    return DepartureUtils.getTaiThanHyThan(canchi, data);
  }
  public getTuoiXungKhac(canchi: string, data?: any) {
    if (!data) {
      data = this.taiThan_hyThan;
    }
    return DepartureUtils.getTuoiXungKhac(canchi, data);
  }

  public getSaoTot(chi: string, lunarMonth: number, data?: any) {
    if (!data) {
      data = this.sao_tot_data;
    }
    return DepartureUtils.getSaoTot(chi, lunarMonth, data);
  }
  public getSaoXau(can: string, chi: string, lunarMonth: number, data?: any) {
    if (!data) {
      data = this.sao_tot_data;
    }
    return DepartureUtils.getSaoXau(can, chi, lunarMonth, data);
  }

  public getSpecialDate(lunarDay: string, solarDay: string, data?: any) {
    if (!data) {
      data = this.special_data;
    }
    return this.mDepartureLoadData.getSpecialDate(lunarDay, solarDay, data);
  }

  public getValueDataLeVNAL() {
    if (this.cavalVNAL) {
      return this.cavalVNAL;
    }
  }
  public getValueDataLeVNDL() {
    if (this.cavalVNDL) {
      return this.cavalVNDL;
    }
  }

  private _index: number = 0;
  private _counts: Array<number> = [5, 7, 10, 12];
  private _count: number = 0;
  showAdvertisement() {
    this._count++;
    if (this._count > this._counts[this._index]) {
      this.mAdsManager.showInterstital(true);
      if (this._index < this._counts.length - 1) {
        this._index++;
      }
      this._count = 0;
    }
  }

  // To track a Screen 
  trackView() {
    this.mAnalyticsManager.trackScreen('Page view');
  }
  // To track an event
  tracEvent() {
    this.mAnalyticsManager.trackEvent('Category', 'Action', 'Label', 1);
  }
  // To track timing
  trackTiming(IntervalInMilliseconds) {
    this.mAnalyticsManager.trackTiming('Category', IntervalInMilliseconds, 'Variable', 'Label') // where IntervalInMilliseconds is numeric
  }
  //to enabling Advertising Features in Google Analytics allows you to take advantage of Remarketing
  setAllowIDFACollection(value: boolean) {
    this.mAnalyticsManager.setAllowIDFACollection(value);
  }


}


