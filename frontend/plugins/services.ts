import { Plugin } from '@nuxt/types'
import { repositories } from './repositories'
import { ConfigApplicationService } from '@/services/application/autoLabeling/configApplicationService'
import { CommentApplicationService } from '@/services/application/comment/commentApplicationService'
import { DownloadApplicationService } from '@/services/application/download/downloadApplicationService'
import { DownloadFormatApplicationService } from '@/services/application/download/downloadFormatApplicationService'
import { ExampleApplicationService } from '@/services/application/example/exampleApplicationService'
import { LabelApplicationService } from '@/services/application/label/labelApplicationService'
import { MemberApplicationService } from '@/services/application/member/memberApplicationService'
import { OptionApplicationService } from '@/services/application/option/optionApplicationService'
import { ProjectApplicationService } from '@/services/application/project/projectApplicationService'
import { TagApplicationService } from '@/services/application/tag/tagApplicationService'
import { BoundingBoxApplicationService } from '@/services/application/tasks/boundingBox/boundingBoxApplicationService'
import { SegmentationApplicationService } from '@/services/application/tasks/segmentation/segmentationApplicationService'
import { Seq2seqApplicationService } from '@/services/application/tasks/seq2seq/seq2seqApplicationService'
import { SequenceLabelingApplicationService } from '@/services/application/tasks/sequenceLabeling/sequenceLabelingApplicationService'
import { TextClassificationService } from '@/services/application/tasks/textClassification/textClassificationApplicationService'
import { CatalogApplicationService } from '@/services/application/upload/catalogApplicationService'
import { ParseApplicationService } from '@/services/application/upload/parseApplicationService'

export interface Services {
  categoryType: LabelApplicationService
  spanType: LabelApplicationService
  relationType: LabelApplicationService
  member: MemberApplicationService
  project: ProjectApplicationService
  comment: CommentApplicationService
  example: ExampleApplicationService
  textClassification: TextClassificationService
  sequenceLabeling: SequenceLabelingApplicationService
  seq2seq: Seq2seqApplicationService
  option: OptionApplicationService
  config: ConfigApplicationService
  catalog: CatalogApplicationService
  parse: ParseApplicationService
  downloadFormat: DownloadFormatApplicationService
  download: DownloadApplicationService
  tag: TagApplicationService
  bbox: BoundingBoxApplicationService
  segmentation: SegmentationApplicationService
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $services: Services
  }
}

const plugin: Plugin = (_, inject) => {
  const services: Services = {
    categoryType: new LabelApplicationService(repositories.categoryType),
    spanType: new LabelApplicationService(repositories.spanType),
    relationType: new LabelApplicationService(repositories.relationType),
    member: new MemberApplicationService(repositories.member),
    project: new ProjectApplicationService(repositories.project),
    comment: new CommentApplicationService(repositories.comment),
    example: new ExampleApplicationService(repositories.example),
    textClassification: new TextClassificationService(repositories.category),
    sequenceLabeling: new SequenceLabelingApplicationService(
      repositories.span,
      repositories.relation
    ),
    seq2seq: new Seq2seqApplicationService(repositories.textLabel),
    option: new OptionApplicationService(repositories.option),
    config: new ConfigApplicationService(repositories.config),
    catalog: new CatalogApplicationService(repositories.catalog),
    parse: new ParseApplicationService(repositories.parse),
    downloadFormat: new DownloadFormatApplicationService(repositories.downloadFormat),
    download: new DownloadApplicationService(repositories.download),
    tag: new TagApplicationService(repositories.tag),
    bbox: new BoundingBoxApplicationService(repositories.boundingBox),
    segmentation: new SegmentationApplicationService(repositories.segmentation)
  }
  inject('services', services)
}

export default plugin
