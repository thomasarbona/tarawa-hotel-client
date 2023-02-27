export interface KustomTranslatedStrings {
  fr: string;
  en?: string;
  es?: string;
}

export type NewsAction =
  | 'LINK_TO_BE'
  | 'LINK_EXTERNAL'
  | 'LINK_INTERNAL'
  | 'EMAIL';

export type PublishLocation =
  | 'OFFERS_NEWS_PAGE'
  | 'VIP_OFFERS_PAGE'
  | 'SPOTLIGHT_OFFER'
  | 'HSP_MODULE';

export type NewsSocialMedia = 'FACEBOOK' | 'INSTAGRAM';

export type TranslatedStrings = {
  [key in Language]?: string;
};

export type Rubric =
  | 'STAY'
  | 'RESTAURANT'
  | 'SPA'
  | 'SEMINARS'
  | 'WEDDINGS'
  | 'NONE';

export type Theme =
  | 'LAST_MINUTE'
  | 'EARLY_BOOKING'
  | 'PROMOTION'
  | 'PACKAGE'
  | 'GIFT_BOX'
  | 'NONE';

export interface News {
  _id?: string;
  title?: KustomTranslatedStrings;
  shortDescription?: KustomTranslatedStrings;
  description?: KustomTranslatedStrings;
  medias?: KustomMedia[];
  isButtonDisabled: boolean;
  buttonLabel?: string;
  buttonAction?: NewsAction;
  buttonActionString: string;
  establishmentsIds: string[];
  location: PublishLocation[];
  socialMedias: NewsSocialMedia[];
  isModel: boolean;
  isSuspended: boolean;
  createdAt?: string;
  extraData?: ExtraData;
}

export type DiscountDisplay = 'REGULAR' | 'WITH_PERCENTAGE';

export type FlashSaleTimeUnit = 'HOURS' | 'DAYS' | 'WEEKS' | 'MONTHS';

export type ValidityPeriodModel = 'FROMTO' | 'FROM' | 'TO';

export type ActivePeriodModel = 'ALWAYS' | 'SET_DATES';

export type ActivePeriodSetDatesModel = 'FROM' | 'FROMTO' | 'DAYS';

export type ActivePeriodDayTimeSlot = { from: Date; to: Date };

export type ActivePeriodDay = {
  dayIndex: number;
  timeSlots: ActivePeriodDayTimeSlot[];
};

export const offersNewsStatusValues = [
  { value: 'EXPIRED', label: 'Expirée' },
  { value: 'ACTIVE', label: 'En ligne' },
  { value: 'PENDING', label: 'Programmé' },
  { value: 'SUSPENDED', label: 'Suspendu' },
  { value: 'DRAFT', label: 'Brouillon' },
];
export type OffersNewsStatus =
  | 'EXPIRED'
  | 'ACTIVE'
  | 'PENDING'
  | 'SUSPENDED'
  | 'DRAFT';
interface ExtraData {
  activeDays: number;
  reservations?: number;
  sales?: number;
  status: OffersNewsStatus;
}
export interface Offer {
  _id?: string;
  title?: KustomTranslatedStrings;
  shortDescription?: KustomTranslatedStrings;
  description?: KustomTranslatedStrings;
  medias?: KustomMedia[];
  rubrics: Rubric[];
  theme: Theme | string;
  isButtonDisabled: boolean;
  buttonLabel?: string;
  buttonAction?: NewsAction;
  buttonActionString: string;
  isPriceDisabled: boolean;
  isPriceFrom: boolean;
  price: number;
  priceDetails: string;
  isDiscountEnabled: boolean;
  discount: number;
  isDiscountPercentage: boolean;
  discountDisplay: DiscountDisplay;
  isFlashSaleEnabled: boolean;
  flashSaleTime: number;
  flashSaleTimeUnit: FlashSaleTimeUnit;
  flashSaleLocation: PublishLocation[];
  metaTitle: string;
  metaDescription: string;
  prettyURL: string;
  validityPeriodModel: ValidityPeriodModel;
  validityPeriodFrom: Date | string;
  validityPeriodTo: Date | string;
  activePeriodModel: ActivePeriodModel;
  activePeriodSetDatesModel: ActivePeriodSetDatesModel;
  activePeriodFrom: Date | string;
  activePeriodTo: Date | string;
  activePeriodDays: ActivePeriodDay[];
  establishmentsIds: string[];
  location: PublishLocation[];
  socialMedias: NewsSocialMedia[];
  isModel: boolean;
  isSuspended: boolean;
  createdAt?: string;
  extraData?: ExtraData;
}

export interface KustomPageComponent<T> {
  id: string;
  type: PageComponentType;
  nameAs?: string;
  isLocked: boolean;
  data: T;
}

export interface KustomPage {
  _id: string;
  pageCode: string;
  index: number;
  isCopy: boolean;
  title: KustomTranslatedStrings;
  model?: string;
  category: string;
  stringBeforeSlug: string;
  titleH1?: KustomTranslatedStrings;
  targetLink?: string;
  excludeFromMenu: boolean;
  cssClass?: string;
  metaTitle?: KustomTranslatedStrings;
  prettyUrl: string;
  metaDescription: KustomTranslatedStrings;
  status: string;
  publishedOn?: Date;
  SEOScore?: number;
  updatedAt: string;
  components: KustomPageComponent<any>[];
}

export interface KustomRoutes {
  [route: string]: KustomPage;
}

export interface KustomResponsiveMedia {
  id: string;
  default?: KustomMedia;
  mobile?: KustomMedia;
  tablet?: KustomMedia;
}

export interface MediaMutableMetadata {
  _id: string;
  bucketName: string;
  keys?: {
    fr: string;
    en: string;
  };
  titles?: {
    fr: string;
    en: string;
  };
  alts?: {
    fr: string;
    en: string;
  };
  key: string;
  originalKey: string;
  tags: string[];
  autoplay?: string;
}

export interface KustomMedia {
  url: string;
  filename: string;
  metadata: { [key: string]: string };
  mutableMetadata: MediaMutableMetadata;
}

export interface KustomResponsiveMedia {
  id: string;
  default?: KustomMedia;
  mobile?: KustomMedia;
  tablet?: KustomMedia;
}

export interface AccordionComponentData {
  slides: AccordionComponentSlide[];
}

export interface CarouselComponentSlide {
  id: string;
  title: TranslatedStrings;
  subtitle: TranslatedStrings;
  atomicComponents: AtomicComponent[];
  medias: KustomResponsiveMedia;
}

export interface CarouselComponentData {
  slides: CarouselComponentSlide[];
}

export interface CarouselTextImageComponentData {
  slides: CarouselTextImageComponentSlide[];
}

export interface CustomComponentData {
  atomicComponents: AtomicComponent[];
}

export interface GoogleMapComponentData {
  url: string;
}

export interface InsertComponentSlide {
  id: string;
  title: KustomTranslatedStrings;
  subtitle: KustomTranslatedStrings;
  description: KustomTranslatedStrings;
  url: string;
}

export interface InsertComponentData {
  slides: InsertComponentSlide[];
}

export interface MediasComponentData {
  medias: KustomResponsiveMedia[];
}

export interface OffersListComponentData {
  activeOffersId: string[];
  offers: string[];
}

export interface PanelComponentData {
  id: string;
  openType: string;
  components: KustomPageComponent<any>[];
}

export interface PlanComponentSlide {
  id: string;
  title: KustomTranslatedStrings;
  distance?: string;
  phone?: string;
  link?: string;
  description: KustomTranslatedStrings;
  gpsCoordX: string;
  gpsCoordY: string;
  medias: {
    default?: KustomMedia;
    tablet?: KustomMedia;
    mobile?: KustomMedia;
  };
}

export interface PlanComponentData {
  slides: PlanComponentSlide[];
}

export interface RoomBookingData {
  system: string;
  systemData: any;
}

export interface RoomListComponentData {
  activeRoomsId: string[];
  rooms: string[];
}

export interface RoomSpecsComponentData {
  title: KustomTranslatedStrings;
  peoplesNumber?: number;
  area: string;
  bed: string;
  feature: string;
}

interface Stuff {
  id: string;
  media?: KustomMedia;
  title: KustomTranslatedStrings;
}

export interface RoomStuffComponentSlide {
  id: string;
  title: KustomTranslatedStrings;
  stuff: Stuff[];
}

export interface RoomStuffComponentData {
  slides: RoomStuffComponentSlide[];
}

export interface TableComponentData {
  nColumns: number;
  nRow: number;
  data: KustomTranslatedStrings[][];
}

export interface TestimonyComponentSlide {
  id: string;
  title: KustomTranslatedStrings;
  note?: number;
  author?: string;
  publishDate?: string;
  description: KustomTranslatedStrings;
  medias: KustomResponsiveMedia;
}

export interface TestimonyComponentData {
  slides: TestimonyComponentSlide[];
}

export interface TextCarouselComponentData {
  textTitle: KustomTranslatedStrings;
  textSubtitle: KustomTranslatedStrings;
  text: KustomTranslatedStrings;
  atomicComponents: AtomicComponent[];
  slides: CarouselComponentSlide[];
}

export interface TextComponentData {
  text: KustomTranslatedStrings;
  atomicComponents: AtomicComponent[];
}

export interface TextImageComponentData {
  media?: KustomResponsiveMedia;
  text: KustomTranslatedStrings;
  atomicComponents: AtomicComponent[];
}

export interface BaseAtomicComponent {
  id: string;
  type: 'CODE' | 'TEXT' | 'ACTION_BUTTON' | 'ACCORDION' | 'MEDIA';
  isHidden?: boolean;
  isLocked?: boolean;
}

export interface ActionButton extends BaseAtomicComponent {
  label: KustomTranslatedStrings;
  action: string;
  actionString?: string;
  target?: string;
}

export interface Accordion extends BaseAtomicComponent {
  slides: {
    id: string;
    text: KustomTranslatedStrings;
    hiddenText: KustomTranslatedStrings;
  }[];
}

export interface AccordionComponentSlide {
  id: string;
  text: KustomTranslatedStrings;
  hiddenText: KustomTranslatedStrings;
}

export interface Code extends BaseAtomicComponent {
  code: string;
}

export interface Text extends BaseAtomicComponent {
  text: KustomTranslatedStrings;
}

export interface MediaComponent extends BaseAtomicComponent {
  media: KustomResponsiveMedia;
}

export type AtomicComponent =
  | ActionButton
  | Accordion
  | Code
  | Text
  | MediaComponent;
