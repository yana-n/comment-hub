const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

export function prettifyDate(
    dateStr: string,
    options: Intl.DateTimeFormatOptions = dateOptions,
    code: string = 'en-US'
): string {
    const date = new Date(dateStr);

    return new Intl.DateTimeFormat(code, options).format(date);
}
