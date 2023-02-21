export interface KustomTranslatedStrings {
  fr: string;
  en?: string;
  es?: string;
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
