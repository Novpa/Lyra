import { PostRepository } from "../repositories/PostRepository";

export class PostService {
  private postRepository: PostRepository;

  constructor(PostRepositoryInstance: PostRepository) {
    this.postRepository = PostRepositoryInstance;
  }

  public async createPost(authorId: string, content: string) {
    return await this.postRepository.createPost(authorId, content);
  }
}
