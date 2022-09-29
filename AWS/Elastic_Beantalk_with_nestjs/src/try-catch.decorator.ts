export function TryCatch(errorMsg?: string) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        const origin = desc.value;
        // console.log(origin);
        desc.value = async function (...args: any[]) {
            try {
                // console.log(args);
                // console.log(this);
                return await origin.apply(this, args);
            } catch (e) {
                console.log(e.message);
                return { 
                    ok: false, 
                    error: errorMsg
                };
            }
        };
    };
}