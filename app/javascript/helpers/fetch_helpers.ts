// rails requires a csrf token for form submissions, this function returns that token in json format
// embed this within fetch request headers with ...getCSRF()
export function getCSRF() {
    // @ts-ignore
    const token = document.querySelector('[name=csrf-token]').content;
    return { 'X-CSRF-TOKEN': token };
}