import moment from "moment";

/* List of all available parsing tokens
-----------------------------------------
Input   Example             Description
-----------------------------------------
YY	    01	                Two-digit year
YYYY	  2001	              Four-digit year
MM	    01-12	              Month, 2-digits
MMM	    Jan-Dec	            The abbreviated month name
D	      1-31	              Day of month
DD	    01-31	              Day of month, 2-digits
*/

export function formatDate(format: string, date: Date = new Date()): string {
    
    if (!/^(YY|YYYY|MMM|MM|DD|D)(-(YY|YYYY|MMM|MM|DD|D))*$/.test(format)) {
        throw new Error("Invalid format string. Use YY, YYYY, MMM, MM, DD, D separated by '-'");
    }

    const map: { [key: string]: string } = {
        'YY': ('0' + (date.getFullYear() % 100)).slice(-2),
        'YYYY': date.getFullYear().toString(),
        'MM': ('0' + (date.getMonth() + 1)).slice(-2),
        'MMM': date.toLocaleString('default', { month: 'short' }),
        'D': date.getDate().toString(),
        'DD': ('0' + date.getDate()).slice(-2),
    };

    const formats = format.split('-');
    if (!formats.every(f => Object.keys(map).includes(f))) {
        throw new Error("Invalid format string. Use YY, YYYY, MMM, MM, DD, D separated by '-'");
    }

    return format.replace(/YYYY|YY|MMM|MM|DD|D/g, matched => map[matched]);
}