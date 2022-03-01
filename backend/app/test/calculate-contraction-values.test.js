"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculate_contraction_values_1 = require("../app/utils/calculate-labor-values/calculate-contraction-values");
const default_labor_1 = require("../app/utils/default-labor");
describe('calculateContractionValues', () => {
    const result = (0, calculate_contraction_values_1.calculateContractionValues)((0, default_labor_1.defaultLabor)());
    it('should correctly calculate the values', () => {
        expect(result).toEqual({
            "averageDuration": 90,
            "averageIntensity": 1.5,
            "durations": [
                60,
                120,
            ],
            "intensities": [
                1,
                2,
            ],
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRlLWNvbnRyYWN0aW9uLXZhbHVlcy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FsY3VsYXRlLWNvbnRyYWN0aW9uLXZhbHVlcy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUhBQThHO0FBQzlHLDhEQUEwRDtBQUUxRCxRQUFRLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO0lBQzFDLE1BQU0sTUFBTSxHQUFHLElBQUEseURBQTBCLEVBQUMsSUFBQSw0QkFBWSxHQUFFLENBQUMsQ0FBQTtJQUN6RCxFQUFFLENBQUMsdUNBQXVDLEVBQUUsR0FBRyxFQUFFO1FBQy9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbEIsaUJBQWlCLEVBQUUsRUFBRTtZQUNyQixrQkFBa0IsRUFBRSxHQUFHO1lBQ3ZCLFdBQVcsRUFBRztnQkFDWixFQUFFO2dCQUNGLEdBQUc7YUFDSjtZQUNELGFBQWEsRUFBRTtnQkFDYixDQUFDO2dCQUNELENBQUM7YUFDRjtTQUNGLENBQUMsQ0FBQTtJQUNQLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEifQ==