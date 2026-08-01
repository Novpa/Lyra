import { PostRepository } from "../repositories/PostRepository";

export class PostService {
  private postRepository: PostRepository;

  constructor(PostRepositoryInstance: PostRepository) {
    this.postRepository = PostRepositoryInstance;
  }

  public async createPost(authorId: string, content: string) {
    return await this.postRepository.createPost(authorId, content);
  }

  public async getAllPost(limit: number, page: number) {
    const result = await this.postRepository.getAllPost(limit, page);

    const meta = {
      totalData: 0,
      totalPage: 0,
    };

    const constructedPost = result.map(
      ({ passwordHash, total_data, total_page, ...rest }) => {
        meta.totalData = Number(total_data);
        meta.totalPage = Number(total_page);

        return rest;
      },
    );

    return {
      post: constructedPost,
      meta,
    };
  }
}
