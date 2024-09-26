export type ArticleProps = {
  author: string;
  company: string;
  name: string;
  description: string;
  cover: string;
  magazineId: number;
  categoriesId: number;
  status: string;
};

export class Article {
  private props;
  constructor(props: ArticleProps) {
    this.props = props;
  }

  static create(props: ArticleProps) {
    return new Article(props);
  }
  get author(): string {
    return this.props.author;
  }

  get company(): string {
    return this.props.company;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get cover(): string {
    return this.props.cover;
  }

  get magazineId(): number {
    return this.props.magazineId;
  }

  get categoriesId(): number {
    return this.props.categoriesId;
  }

  get status(): string {
    return this.props.status;
  }

}
