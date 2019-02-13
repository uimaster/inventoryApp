export function returnLabel(data){
    var dataarr:any = [];
    for(let i = 0; i< data.length; i++) {
        // the property after data[i]. needs to match the exact name that is on your JSON file... So, name is a different property than Name
        dataarr.push({label: data[i].calculatedon, value: data[i].calcid});
    }

    return dataarr;
}
