export type ArticleOutputDto = {
    id: number;
    name: string | null;
    cover: string | null;
    views?: number | null;
    author: string | null;
    description: string | null;
    status: string | null;
    createDate: Date | null;
    updateAt: Date | null;
    magazineId?: number | null;
    company?: string | null;
    categoriesId?: number;
    categories?: any | null;
    magazine?: any | null;
  };
 
 