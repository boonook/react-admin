/**
 * 从 x=1&y=1 形式的字符串中获取参数 {x:1,y:1}
 * @param url
 * @returns {{fileName: string}}
 * @private
 */
export const getQueryParams = (url) => {
    let params = null;
    const arr = url.split('?');
    if (arr && Array.isArray(arr) && arr.length > 0) {
        params = {};
        arr[arr.length - 1].split('&').map((s)=>{
            const p = s.split('=');
            params[p[0]] = p[1];
        });
    } else {
        return null;
    }

    return params;
};


/**
 * 对象深层合并
 * @param def 源对象
 * @param obj 目标对象
 * @returns {any}
 */
export const merge = (def, obj) => {
    try {
        if (!obj) {
            return def;
        } else if (!def) {
            return obj;
        }

        for (let i in obj) {
            // if its an object
            if (obj[i] != null && obj[i].constructor === Object) {
                def[i] = merge(def[i], obj[i]);
            }
            // if its an array, simple values need to be joined.  Object values need to be remerged.
            else if (obj[i] != null && (obj[i] instanceof Array) && obj[i].length > 0) {
                // test to see if the first element is an object or not so we know the type of array we're dealing with.
                if (obj[i][0].constructor === Object) {
                    let newobjs = [];
                    // create an index of all the existing object IDs for quick access.  There is no way to know how many items will be in the arrays.
                    let objids = {};
                    for (let x = 0, l = def[i].length; x < l; x++) {
                        objids[def[i][x].id] = x;
                    }

                    // now walk through the objects in the new array
                    // if the ID exists, then merge the objects.
                    // if the ID does not exist, push to the end of the def array
                    for (let x = 0, l = obj[i].length; x < l; x++) {
                        let newobj = obj[i][x];
                        if (objids[newobj.id] !== undefined) {
                            def[i][x] = merge(def[i][x], newobj);
                        }
                        else {
                            newobjs = newobjs.concat(newobj);
                        }
                    }

                    for (let x = 0, l = newobjs.length; x < l; x++) {
                        // def[i].push(newobjs[x]);
                        def[i] = def[i].contact(newobjs[x]);
                    }
                }
                else {
                    for (let x = 0; x < obj[i].length; x++) {
                        let idxObj = obj[i][x];
                        if (def[i].indexOf(idxObj) === -1) {
                            // def[i]
                            def[i] = def[i].concat(idxObj);
                        }
                    }
                }
            }
            else {
                def[i] = obj[i];
            }
        }
        return def;
    } catch (e) {
        console.log('merge->error', e);
        return def;
    }

};

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
    let len = Math.min(arr1.length, arr2.length)
    let i = -1
    let res = []
    while (++i < len) {
        const item = arr2[i]
        if (arr1.indexOf(item) > -1) res.push(item)
    }
    return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
    return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
    return targetarr.some(_ => (arr||[]).indexOf(_) > -1)
}

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
    const ua = window.navigator.userAgent
    const isExplorer = (exp) => {
        return ua.indexOf(exp) > -1
    }
    if (isExplorer('MSIE')) return 'IE'
    else if (isExplorer('Firefox')) return 'Firefox'
    else if (isExplorer('Chrome')) return 'Chrome'
    else if (isExplorer('Opera')) return 'Opera'
    else if (isExplorer('Safari')) return 'Safari'
}

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
    const keysArr1 = Object.keys(obj1)
    const keysArr2 = Object.keys(obj2)
    if (keysArr1.length !== keysArr2.length) return false
    else if (keysArr1.length === 0 && keysArr2.length === 0) return true
    /* eslint-disable-next-line */
    else return !keysArr1.some(key => obj1[key] != obj2[key])
}


/**
 * 对象是否为空
 * @param obj
 * @return {boolean}
 */
export const isEmpty = (obj, strict = false) => {
    if (obj === null || obj === undefined)  return true;
    if (typeof obj === 'number') return false
    if (typeof obj === 'string') {
        if (strict) {
            return obj.length <= 0;
        }
        return false;
    }
    if (typeof obj === 'object') {
        if (strict) {
            return Object.keys(obj).length <= 0
        }
        return false
    }
    if (obj === undefined) return true;
    if (obj === null) return true;
    if (isNaN(obj)) return true;
    return false
};
/**
 *
 * @param {object} obj
 * @return {string}
 */
export const makeQueryString = (obj) => {
    if (!obj) return '';
    const query = Object.keys(obj).filter(k => obj.hasOwnProperty(k) && !isEmpty(obj[k], true)).map(k => `${k}=${obj[k]}`).join('&');
    if (isEmpty(query)) {
        return ''
    }
    return `?${query}`
};


/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
    const keyValueArr = url.split('?')[1].split('&')
    let paramObj = {}
    keyValueArr.forEach(item => {
        const keyValue = item.split('=')
        paramObj[keyValue[0]] = keyValue[1]
    })
    return paramObj
}


export const flattenTree=(tree,component)=>{
    const k = `_parent_${component}`;
    const _flatten = (data, node = {}) => {
        return data.reduce((arr, n) => {
            n[k] = ((n[component] || n['_'+component]) + ',' + node[k] || '') || '';
            const t = {...n};
            delete t.subs;
            let o = {...t};
            o[k] = n[k] || '';
            return arr.concat([o], _flatten(n.subs || [], n))
        }, [])
    };
    const temp = _flatten(tree).map(i => {
        let o = {...i,};
        o[k] = i[k].replace(new RegExp(`undefined`, 'g'), '').split(',').filter(i => !!i).reverse().join(',');
        return o;
    });
    return temp;
};

export const makeFormData = params => {
    if (!params) return new FormData();
    if (typeof params !== "object") return new FormData();
    let formData = new FormData();
    Object.keys(params).forEach(k => {
        if (params.hasOwnProperty(k) && !isEmpty(params[k])) {
            ///如果需要添加到表单的值是数组
            if (Array.isArray(params[k]) && !isEmpty(params[k])) {

                params[k].forEach((i, index) => {

                    ///如果是文件 直接添加到formDate
                    if (i.constructor === File) {
                        formData.append(k, i)
                    }
                    ///如果是对象 需要转换为 form字段[数组下标].对象的key 这个形式的key再添加到formData
                    else if (typeof i === 'object') {
                        Object.keys(i).forEach(kk => {
                            formData.append(`${k}[${index}].${kk}`, i[kk]);
                        });
                    } else {
                        formData.append(k, i)
                    }
                });
            }
            ///如果需要添加到表单的是对象
            else if(params[k].constructor === File){
                formData.append(k,params[k]);
            }
            else if (typeof params[k] === 'object') {
                Object.keys(params[k]).forEach(kk => {
                    formData.append(`${k}.${kk}`, params[k][kk]);
                });
            } else {
                formData.append(k, params[k]);
            }
        }
    });
    return formData;
};
