"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
exports.Client = (opts) => {
    const headers = opts.accessToken
        ? {
            Authorization: `Bearer ${opts.accessToken}`
        }
        : {
            'X-Figma-Token': opts.personalAccessToken
        };
    const client = axios_1.default.create({
        baseURL: `https://${opts.apiRoot || 'api.figma.com'}/v1/`,
        headers
    });
    return {
        client,
        file: (fileId, params = {}) => client.get(`files/${fileId}`, { params }),
        fileVersions: fileId => client.get(`files/${fileId}/versions`),
        fileNodes: (fileId, params) => client.get(`files/${fileId}/nodes`, {
            params: Object.assign(Object.assign({}, params), { ids: params.ids.join(',') })
        }),
        fileImages: (fileId, params) => client.get(`images/${fileId}`, {
            params: Object.assign(Object.assign({}, params), { ids: params.ids.join(',') })
        }),
        fileImageFills: fileId => client.get(`files/${fileId}/images`),
        comments: fileId => client.get(`files/${fileId}/comments`),
        postComment: (fileId, params) => client.post(`files/${fileId}/comments`, params),
        me: () => client.get(`me`),
        teamProjects: teamId => client.get(`teams/${teamId}/projects`),
        projectFiles: projectId => client.get(`projects/${projectId}/files`),
        teamComponents: (teamId, params = {}) => client.get(`teams/${teamId}/components`, { params }),
        component: key => client.get(`components/${key}`),
        teamStyles: (teamId, params = {}) => client.get(`teams/${teamId}/styles`, { params }),
        style: key => client.get(`styles/${key}`)
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxrREFBMkQ7QUErUDlDLFFBQUEsTUFBTSxHQUFHLENBQUMsSUFBbUIsRUFBbUIsRUFBRTtJQUM3RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVztRQUM5QixDQUFDLENBQUM7WUFDRSxhQUFhLEVBQUUsVUFBVSxJQUFJLENBQUMsV0FBVyxFQUFFO1NBQzVDO1FBQ0gsQ0FBQyxDQUFDO1lBQ0UsZUFBZSxFQUFFLElBQUksQ0FBQyxtQkFBbUI7U0FDMUMsQ0FBQztJQUVOLE1BQU0sTUFBTSxHQUFHLGVBQUssQ0FBQyxNQUFNLENBQUM7UUFDMUIsT0FBTyxFQUFFLFdBQVcsSUFBSSxDQUFDLE9BQU8sSUFBSSxlQUFlLE1BQU07UUFDekQsT0FBTztLQUNSLENBQUMsQ0FBQztJQUVILE9BQU87UUFDTCxNQUFNO1FBRU4sSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBRXhFLFlBQVksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxNQUFNLFdBQVcsQ0FBQztRQUU5RCxTQUFTLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLE1BQU0sUUFBUSxFQUFFO1lBQ2xDLE1BQU0sa0NBQ0QsTUFBTSxLQUNULEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FDMUI7U0FDRixDQUFDO1FBRUosVUFBVSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQzdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxNQUFNLEVBQUUsRUFBRTtZQUM3QixNQUFNLGtDQUNELE1BQU0sS0FDVCxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQzFCO1NBQ0YsQ0FBQztRQUVKLGNBQWMsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxNQUFNLFNBQVMsQ0FBQztRQUU5RCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsTUFBTSxXQUFXLENBQUM7UUFFMUQsV0FBVyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxNQUFNLFdBQVcsRUFBRSxNQUFNLENBQUM7UUFFakQsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBRTFCLFlBQVksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxNQUFNLFdBQVcsQ0FBQztRQUU5RCxZQUFZLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksU0FBUyxRQUFRLENBQUM7UUFFcEUsY0FBYyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsTUFBTSxhQUFhLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUV0RCxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFFakQsVUFBVSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsTUFBTSxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUVsRCxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7S0FDMUMsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9