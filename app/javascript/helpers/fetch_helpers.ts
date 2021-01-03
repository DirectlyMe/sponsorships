export function getCSRF() {
    // @ts-ignore
    const token = document.querySelector('[name=csrf-token]').content;
    return { 'X-CSRF-TOKEN': token };
}