package org.gold.stratego.database.entities;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.Arrays;

/**
 * POJO implementation of MongoDB game data.
 * Refer to database/GameDB_format.json for data format
 * @author Jacob Thomas
 */
@Document(collection="games")
public class Game {

    @Id
    private String id;
    private String username;
    private String result;
    private int[][] board_start;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public int[][] getBoard_start() {
        return board_start;
    }

    public void setBoard_start(int[][] board_start) {
        this.board_start = board_start;
    }

    @Override
    public String toString() {
        return "Game{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", result='" + result + '\'' +
                ", board_start=" + Arrays.toString(board_start) +
                '}';
    }
}
