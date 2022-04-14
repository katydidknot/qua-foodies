import Papa from 'papaparse';

export const parseCsv = () => {
    let data;
    Papa.parse('yelp_data_final.csv', {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: function(results) {
            console.log(results);
            data = results.data;
        }
    });
}
