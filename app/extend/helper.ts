
// export class helper {
//     foo(param: any) {
//         // this 是 helper 对象，在其中可以调用其他 helper 方法
//         // this.ctx => context 对象
//         // this.app => application 对象
//     }
// };

export default {
    foo(param: any) {
        // this 是 helper 对象，在其中可以调用其他 helper 方法
        // this.ctx => context 对象
        // this.app => application 对象
    }
}



declare module 'egg' {
    export interface Context {
        helper: {
            foo: () => {

            }
        }
    }
}