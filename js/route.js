export function Route(name, htmlName, defaultRoute) {
    try {
        if (!name || !htmlName) {
            throw 'error: name and htmlName params are mandatories'
        }
        this.constructor(name, htmlName, defaultRoute)
    } catch (e) {
        console.error(e)
    }
}

Route.prototype = {
    name: undefined,
    htmlName: undefined,
    default: undefined,
    constructor: function(name, htmlName, defaultRoute) {
        this.name = name;
        this.htmlName = htmlName;
        this.default = defaultRoute;
    },
    isActiveRoute: function(hashedPath) {
        const [url, page] = hashedPath.split('#')
        return page === this.name
    }
}