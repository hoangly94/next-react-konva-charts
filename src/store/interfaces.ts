export interface ICodeFilter {
    id: number,
    code: string,
    company: string,
}

export interface ITable {
    data: Array<Object>,
    count: number,
    page: number,
    pageCount: number,
    total: number,
}